import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthorService } from '../../../core/services/author.service';
import { BookService } from '../../../core/services/book.service';
import { VideoService } from '../../../core/services/video.service';
import { Author } from '../../../core/models/author.model';
import { Book } from '../../../core/models/book.model';
import { Video } from '../../../core/models/video.model';

@Component({
  selector: 'app-author-detail',
  imports: [RouterLink, CommonModule],
  templateUrl: './author-detail.html',
})
export class AuthorDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private authorService = inject(AuthorService);
  private bookService = inject(BookService);
  private videoService = inject(VideoService);

  author = signal<Author | null>(null);
  books = signal<Book[]>([]);
  videos = signal<Video[]>([]);
  loading = signal(true);
  activeTab = signal<'books' | 'videos'>('books');

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.authorService.selectById(id).subscribe({
      next: (a) => { this.author.set(a); this.loadContent(); },
      error: () => this.loading.set(false),
    });
  }

  private loadContent() {
    const authorId = this.author()!.id;
    this.bookService.selectMany({ authorId, limit: 100 }).subscribe({
      next: (res) => this.books.set(res.data),
    });
    this.videoService.selectMany({ authorId, limit: 100 }).subscribe({
      next: (res) => { this.videos.set(res.data); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }
}
