import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

import { Book, FilterBookDto } from "../../books.types";
import { BooksService } from "../../books.service";
import { BooksDatatableComponent } from "../../components/books-datatable/books-datatable.component";
import { GenericPaginatorComponent } from "@1hand/components/generic-paginator/generic-paginator.component";
import { GenericErrorComponent } from "@1hand/components/generic-error/generic-error.component";

@Component({
  selector: "app-books-list-page",
  standalone: true,
  imports: [
    CommonModule,
    BooksDatatableComponent,
    GenericPaginatorComponent,
    GenericErrorComponent,
  ],
  templateUrl: "./books-list-page.component.html",
})
export class BooksListPageComponent implements OnInit {
  items: Book[] = [];
  total = 0;
  loading = false;
  error?: unknown;

  filter: FilterBookDto = {
    page: 1,
    limit: 10,
  };

  constructor(
    private readonly booksService: BooksService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.loading = true;
    this.error = undefined;

    this.booksService.selectMany(this.filter).subscribe({
      next: (response) => {
        this.items = response.data;
        this.total = response.total;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  goToCreate(): void {
    this.router.navigate(["/books", "create"]);
  }

  goToDetails(book: Book): void {
    this.router.navigate(["/books", book.id]);
  }

  goToUpdate(book: Book): void {
    this.router.navigate(["/books", book.id, "update"]);
  }

  onPageChange(event: { page: number; limit: number }): void {
    this.filter = { ...this.filter, ...event };
    this.loadItems();
  }

  get totalPages(): number {
    return Math.ceil(this.total / (this.filter.limit || 10));
  }

  askDelete(book: Book): void {
    this.booksService.delete(book.id).subscribe(() => this.loadItems());
  }
}
