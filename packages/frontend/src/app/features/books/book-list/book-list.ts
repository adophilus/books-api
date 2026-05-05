import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../core/services/book.service';
import { AuthorService } from '../../../core/services/author.service';
import { Book } from '../../../core/models/book.model';
import { Author } from '../../../core/models/author.model';
import { PaginatedResponse } from '../../../core/models/paginated.model';

@Component({
  selector: 'app-book-list',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './book-list.html',
})
export class BookList implements OnInit {
  private bookService = inject(BookService);
  private authorService = inject(AuthorService);

  books = signal<Book[]>([]);
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
  newAuthorId = signal('');
  creating = signal(false);
  submitted = signal(false);

  ngOnInit() {
    this.loadBooks();
    this.authorService.selectMany({ limit: 100 }).subscribe({
      next: (res) => this.authors.set(res.data),
    });
  }

  loadBooks() {
    this.loading.set(true);
    this.bookService
      .selectMany({
        search: this.search() || undefined,
        authorId: this.filterAuthorId() || undefined,
        page: this.page(),
        limit: this.limit(),
      })
      .subscribe({
        next: (res: PaginatedResponse<Book>) => {
          this.books.set(res.data);
          this.total.set(res.total);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
  }

  onSearch() {
    this.page.set(1);
    this.loadBooks();
  }

  setPage(p: number) {
    this.page.set(p);
    this.loadBooks();
  }

  createBook(form: NgForm) {
    this.submitted.set(true);
    if (form.invalid) return;
    this.creating.set(true);
    this.bookService
      .create({
        title: this.newTitle(),
        description: this.newDescription() || undefined,
        authorId: this.newAuthorId(),
      })
      .subscribe({
        next: () => {
          this.newTitle.set('');
          this.newDescription.set('');
          this.newAuthorId.set('');
          this.showCreateForm.set(false);
          this.creating.set(false);
          this.submitted.set(false);
          this.loadBooks();
        },
        error: () => this.creating.set(false),
      });
  }

  deleteBook(id: string) {
    if (!confirm('Are you sure you want to delete this book?')) return;
    this.bookService.remove(id).subscribe(() => this.loadBooks());
  }

  getAuthorName(authorId: string): string {
    return this.authors().find((a) => a.id === authorId)?.name ?? 'Unknown';
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
