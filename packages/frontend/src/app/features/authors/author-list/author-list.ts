import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthorService } from '../../../core/services/author.service';
import { Author } from '../../../core/models/author.model';
import { PaginatedResponse } from '../../../core/models/paginated.model';

@Component({
  selector: 'app-author-list',
  imports: [RouterLink, FormsModule],
  templateUrl: './author-list.html',
})
export class AuthorList implements OnInit {
  private authorService = inject(AuthorService);

  authors = signal<Author[]>([]);
  total = signal(0);
  page = signal(1);
  limit = signal(10);
  search = signal('');
  loading = signal(true);

  showCreateForm = signal(false);
  newName = signal('');
  newEmail = signal('');
  creating = signal(false);

  ngOnInit() {
    this.loadAuthors();
  }

  loadAuthors() {
    this.loading.set(true);
    this.authorService.selectMany({
      search: this.search() || undefined,
      page: this.page(),
      limit: this.limit(),
    }).subscribe({
      next: (res: PaginatedResponse<Author>) => {
        this.authors.set(res.data);
        this.total.set(res.total);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  onSearch() {
    this.page.set(1);
    this.loadAuthors();
  }

  setPage(p: number) {
    this.page.set(p);
    this.loadAuthors();
  }

  createAuthor() {
    if (!this.newName() || !this.newEmail()) return;
    this.creating.set(true);
    this.authorService.create({ name: this.newName(), email: this.newEmail() }).subscribe({
      next: () => {
        this.newName.set('');
        this.newEmail.set('');
        this.showCreateForm.set(false);
        this.creating.set(false);
        this.loadAuthors();
      },
      error: () => this.creating.set(false),
    });
  }

  deleteAuthor(id: string) {
    if (!confirm('Are you sure you want to delete this author?')) return;
    this.authorService.remove(id).subscribe(() => this.loadAuthors());
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
