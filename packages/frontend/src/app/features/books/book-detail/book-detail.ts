import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../core/services/book.service';
import { AuthorService } from '../../../core/services/author.service';
import { BookViewService } from '../../../core/services/book-view.service';
import { BookCommentService } from '../../../core/services/book-comment.service';
import { CurrentAuthorService } from '../../../core/services/current-author.service';
import { Book } from '../../../core/models/book.model';
import { BookComment } from '../../../core/models/book-comment.model';

@Component({
  selector: 'app-book-detail',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './book-detail.html',
})
export class BookDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bookService = inject(BookService);
  private authorService = inject(AuthorService);
  private bookViewService = inject(BookViewService);
  private bookCommentService = inject(BookCommentService);
  private currentAuthorService = inject(CurrentAuthorService);

  book = signal<Book | null>(null);
  authorName = signal('');
  authorsMap = signal<Map<string, string>>(new Map());
  comments = signal<BookComment[]>([]);
  loading = signal(true);

  editing = signal(false);
  editTitle = signal('');
  editDescription = signal('');

  newComment = signal('');
  submittingComment = signal(false);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.authorService.selectMany({ limit: 100 }).subscribe({
      next: (res) => {
        const map = new Map<string, string>();
        res.data.forEach((a) => map.set(a.id, a.name));
        this.authorsMap.set(map);
      },
    });
    this.bookService.selectById(id).subscribe({
      next: (book) => {
        this.book.set(book);
        this.editTitle.set(book.title);
        this.editDescription.set(book.description ?? '');
        this.loadAuthorName(book.authorId);
        this.loadComments(book.id);
      },
      error: () => this.loading.set(false),
    });
  }

  private loadAuthorName(authorId: string) {
    this.authorService.selectById(authorId).subscribe({
      next: (a) => this.authorName.set(a.name),
    });
  }

  private loadComments(bookId: string) {
    this.bookCommentService.selectMany({ bookId, limit: 100 }).subscribe({
      next: (res) => {
        this.comments.set(res.data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  registerView() {
    const authorId = this.currentAuthorService.authorId();
    if (!authorId) {
      alert('Please select an author first');
      return;
    }
    this.bookViewService.create({ bookId: this.book()!.id, authorId }).subscribe();
  }

  saveEdit() {
    this.bookService
      .update(this.book()!.id, {
        title: this.editTitle(),
        description: this.editDescription() || undefined,
      })
      .subscribe({
        next: (updated) => {
          this.book.set(updated);
          this.editing.set(false);
        },
      });
  }

  deleteBook() {
    if (!confirm('Delete this book?')) return;
    this.bookService.remove(this.book()!.id).subscribe({
      next: () => this.router.navigate(['/books']),
    });
  }

  addComment() {
    const authorId = this.currentAuthorService.authorId();
    if (!authorId) {
      alert('Please select an author first');
      return;
    }
    if (!this.newComment().trim()) return;
    this.submittingComment.set(true);
    this.bookCommentService
      .create({
        bookId: this.book()!.id,
        authorId,
        content: this.newComment(),
      })
      .subscribe({
        next: () => {
          this.newComment.set('');
          this.submittingComment.set(false);
          this.loadComments(this.book()!.id);
        },
        error: () => this.submittingComment.set(false),
      });
  }

  deleteComment(id: string) {
    this.bookCommentService.remove(id).subscribe(() => {
      this.loadComments(this.book()!.id);
    });
  }

  getCommentAuthorName(authorId: string): string {
    return this.authorsMap().get(authorId) ?? 'Unknown';
  }
}
