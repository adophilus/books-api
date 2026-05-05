import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthorService } from '../../core/services/author.service';
import { BookService } from '../../core/services/book.service';
import { VideoService } from '../../core/services/video.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  private authorService = inject(AuthorService);
  private bookService = inject(BookService);
  private videoService = inject(VideoService);

  authorCount = signal(0);
  bookCount = signal(0);
  videoCount = signal(0);
  loading = signal(true);

  async ngOnInit() {
    try {
      const [authors, books, videos] = await Promise.all([
        firstValueFrom(this.authorService.selectMany({ limit: 1 })),
        firstValueFrom(this.bookService.selectMany({ limit: 1 })),
        firstValueFrom(this.videoService.selectMany({ limit: 1 })),
      ]);
      this.authorCount.set(authors?.total ?? 0);
      this.bookCount.set(books?.total ?? 0);
      this.videoCount.set(videos?.total ?? 0);
    } finally {
      this.loading.set(false);
    }
  }
}
