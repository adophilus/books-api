import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VideoService } from '../../../core/services/video.service';
import { AuthorService } from '../../../core/services/author.service';
import { Video } from '../../../core/models/video.model';
import { Author } from '../../../core/models/author.model';
import { PaginatedResponse } from '../../../core/models/paginated.model';

@Component({
  selector: 'app-video-list',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './video-list.html',
})
export class VideoList implements OnInit {
  private videoService = inject(VideoService);
  private authorService = inject(AuthorService);

  videos = signal<Video[]>([]);
  authors = signal<Author[]>([]);
  total = signal(0);
  page = signal(1);
  limit = signal(12);
  search = signal('');
  filterAuthorId = signal('');
  loading = signal(true);

  showCreateForm = signal(false);
  newTitle = signal('');
  newDescription = signal('');
  newUrl = signal('');
  newAuthorId = signal('');
  creating = signal(false);
  submitted = signal(false);

  ngOnInit() {
    this.loadVideos();
    this.authorService.selectMany({ limit: 100 }).subscribe({
      next: (res) => this.authors.set(res.data),
    });
  }

  loadVideos() {
    this.loading.set(true);
    this.videoService.selectMany({
      search: this.search() || undefined,
      authorId: this.filterAuthorId() || undefined,
      page: this.page(),
      limit: this.limit(),
    }).subscribe({
      next: (res: PaginatedResponse<Video>) => {
        this.videos.set(res.data);
        this.total.set(res.total);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  onSearch() {
    this.page.set(1);
    this.loadVideos();
  }

  setPage(p: number) {
    this.page.set(p);
    this.loadVideos();
  }

  createVideo(form: NgForm) {
    this.submitted.set(true);
    if (form.invalid) return;
    this.creating.set(true);
    this.videoService.create({
      title: this.newTitle(),
      description: this.newDescription() || undefined,
      url: this.newUrl(),
      authorId: this.newAuthorId(),
    }).subscribe({
      next: () => {
        this.newTitle.set('');
        this.newDescription.set('');
        this.newUrl.set('');
        this.newAuthorId.set('');
        this.showCreateForm.set(false);
        this.creating.set(false);
        this.submitted.set(false);
        this.loadVideos();
      },
      error: () => this.creating.set(false),
    });
  }

  deleteVideo(id: string) {
    if (!confirm('Are you sure you want to delete this video?')) return;
    this.videoService.remove(id).subscribe(() => this.loadVideos());
  }

  getAuthorName(authorId: string): string {
    return this.authors().find(a => a.id === authorId)?.name ?? 'Unknown';
  }

  totalPages(): number {
    return Math.ceil(this.total() / this.limit());
  }

  pages(): number[] {
    const total = this.totalPages();
    const current = this.page();
    const start = Math.max(1, current - 2);
    const end = Math.min(total, current + 2);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
}
