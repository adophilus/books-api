import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VideoService } from '../../../core/services/video.service';
import { AuthorService } from '../../../core/services/author.service';
import { VideoViewService } from '../../../core/services/video-view.service';
import { VideoCommentService } from '../../../core/services/video-comment.service';
import { Video } from '../../../core/models/video.model';
import { VideoComment } from '../../../core/models/video-comment.model';
import { Author } from '../../../core/models/author.model';

@Component({
  selector: 'app-video-detail',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './video-detail.html',
})
export class VideoDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private videoService = inject(VideoService);
  private authorService = inject(AuthorService);
  private videoViewService = inject(VideoViewService);
  private videoCommentService = inject(VideoCommentService);

  video = signal<Video | null>(null);
  authorName = signal('');
  comments = signal<VideoComment[]>([]);
  loading = signal(true);
  authorsMap = signal<Map<string, string>>(new Map());

  editing = signal(false);
  editTitle = signal('');
  editDescription = signal('');
  editUrl = signal('');

  newComment = signal('');
  submittingComment = signal(false);
  commentSubmitted = signal(false);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.videoService.selectById(id).subscribe({
      next: (video) => {
        this.video.set(video);
        this.editTitle.set(video.title);
        this.editDescription.set(video.description ?? '');
        this.editUrl.set(video.url);
        this.loadAuthorName(video.authorId);
        this.loadComments(video.id);
      },
      error: () => this.loading.set(false),
    });
    this.authorService.selectMany({ limit: 100 }).subscribe({
      next: (res) => {
        const map = new Map<string, string>();
        res.data.forEach((a: Author) => map.set(a.id, a.name));
        this.authorsMap.set(map);
      }
    });
  }

  private loadAuthorName(authorId: string) {
    this.authorService.selectById(authorId).subscribe({
      next: (a) => this.authorName.set(a.name),
    });
  }

  private loadComments(videoId: string) {
    this.videoCommentService.selectMany({ videoId, limit: 100 }).subscribe({
      next: (res) => { this.comments.set(res.data); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  registerView() {
    const authorId = this.video()!.authorId;
    this.videoViewService.create({ videoId: this.video()!.id, authorId }).subscribe();
  }

  saveEdit() {
    this.videoService.update(this.video()!.id, {
      title: this.editTitle(),
      description: this.editDescription() || undefined,
      url: this.editUrl(),
    }).subscribe({
      next: (updated) => {
        this.video.set(updated);
        this.editing.set(false);
      },
    });
  }

  deleteVideo() {
    if (!confirm('Delete this video?')) return;
    this.videoService.remove(this.video()!.id).subscribe({
      next: () => this.router.navigate(['/videos']),
    });
  }

  addComment(form: NgForm) {
    this.commentSubmitted.set(true);
    if (form.invalid) return;
    this.submittingComment.set(true);
    this.videoCommentService.create({
      videoId: this.video()!.id,
      authorId: this.video()!.authorId,
      content: this.newComment(),
    }).subscribe({
      next: () => {
        this.newComment.set('');
        this.commentSubmitted.set(false);
        this.submittingComment.set(false);
        this.loadComments(this.video()!.id);
      },
      error: () => this.submittingComment.set(false),
    });
  }

  deleteComment(id: string) {
    this.videoCommentService.remove(id).subscribe(() => {
      this.loadComments(this.video()!.id);
    });
  }

  getCommentAuthorName(authorId: string): string {
    return this.authorsMap().get(authorId) ?? 'Unknown';
  }
}
