import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../core/services/book.service';
import { AuthorService } from '../../../core/services/author.service';
import { BookViewService } from '../../../core/services/book-view.service';
import { BookCommentService } from '../../../core/services/book-comment.service';
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
  commentSubmitted = signal(false);

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
    const authorId = this.book()!.authorId;
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

  addComment(form: NgForm) {
    this.commentSubmitted.set(true);
    if (form.invalid) return;
    this.submittingComment.set(true);
    this.bookCommentService
      .create({
        bookId: this.book()!.id,
        authorId: this.book()!.authorId,
        content: this.newComment(),
      })
      .subscribe({
        next: () => {
          this.newComment.set('');
          this.commentSubmitted.set(false);
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
