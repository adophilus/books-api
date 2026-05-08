import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { BooksService } from "../../books.service";
import { BookCommentsService } from "../../../book-comments/book-comments.service";
import { BookViewsService } from "../../../book-views/book-views.service";
import { Book } from "../../books.types";
import { BookComment } from "../../../book-comments/book-comments.types";
import { BookView } from "../../../book-views/book-views.types";
import { GenericDatatableColumnDef } from "@1hand/components/generic-datatable/generic-datatable.component";

@Component({
  selector: "app-books-details-page",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./books-details-page.component.html",
})
export class BooksDetailsPageComponent implements OnInit {
  book: Book | null = null;
  loading = false;
  error?: unknown;

  comments: BookComment[] = [];
  commentsTotal = 0;
  commentsLoading = false;

  views: BookView[] = [];
  viewsTotal = 0;
  viewsLoading = false;

  commentColumns: GenericDatatableColumnDef<BookComment>[] = [
    { key: "content", label: "Comment" },
    {
      key: "createdAt",
      label: "Date",
      renderValue: (item) =>
        item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "—",
    },
  ];

  viewColumns: GenericDatatableColumnDef<BookView>[] = [
    {
      key: "viewedAt",
      label: "Viewed At",
      renderValue: (item) =>
        item.viewedAt ? new Date(item.viewedAt).toLocaleDateString() : "—",
    },
  ];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly booksService: BooksService,
    private readonly commentsService: BookCommentsService,
    private readonly viewsService: BookViewsService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (!id) {
      this.error = "Book ID not found";
      return;
    }

    this.loading = true;
    this.booksService.selectById(id).subscribe({
      next: (book) => {
        this.book = book;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = err;
        this.loading = false;
        this.cdr.detectChanges();
      },
    });

    this.loadComments(id);
    this.loadViews(id);
  }

  loadComments(bookId: string): void {
    this.commentsLoading = true;
    this.commentsService.selectMany({ bookId, page: 1, limit: 10 }).subscribe({
      next: (res) => {
        this.comments = res.data;
        this.commentsTotal = res.total;
        this.commentsLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.commentsLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  loadViews(bookId: string): void {
    this.viewsLoading = true;
    this.viewsService.selectMany({ bookId, page: 1, limit: 10 }).subscribe({
      next: (res) => {
        this.views = res.data;
        this.viewsTotal = res.total;
        this.viewsLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.viewsLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  onEdit(): void {
    this.router.navigate(["./update"], { relativeTo: this.route });
  }

  onBack(): void {
    this.router.navigate(["../"], { relativeTo: this.route });
  }
}
