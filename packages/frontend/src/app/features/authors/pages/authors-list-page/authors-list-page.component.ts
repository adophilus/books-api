import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

import { Author, FilterAuthorDto } from "../../authors.types";
import { AuthorsService } from "../../authors.service";
import { AuthorsDatatableComponent } from "../../components/authors-datatable/authors-datatable.component";
import { GenericPaginatorComponent } from "@1hand/components/generic-paginator/generic-paginator.component";
import { GenericErrorComponent } from "@1hand/components/generic-error/generic-error.component";

@Component({
  selector: "app-authors-list-page",
  standalone: true,
  imports: [
    CommonModule,
    AuthorsDatatableComponent,
    GenericPaginatorComponent,
    GenericErrorComponent,
  ],
  templateUrl: "./authors-list-page.component.html",
})
export class AuthorsListPageComponent implements OnInit {
  items: Author[] = [];
  total = 0;
  loading = false;
  error?: unknown;

  filter: FilterAuthorDto = {
    page: 1,
    limit: 10,
  };

  constructor(
    private readonly authorsService: AuthorsService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.loading = true;
    this.error = undefined;

    this.authorsService.selectMany(this.filter).subscribe({
      next: (response) => {
        this.items = response.data;
        this.total = response.total;
        this.loading = false;
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
      },
    });
  }

  goToCreate(): void {
    this.router.navigate(["/authors", "create"]);
  }

  goToDetails(author: Author): void {
    this.router.navigate(["/authors", author.id]);
  }

  goToUpdate(author: Author): void {
    this.router.navigate(["/authors", author.id, "update"]);
  }

  onPageChange(event: { page: number; limit: number }): void {
    this.filter = { ...this.filter, ...event };
    this.loadItems();
  }

  get totalPages(): number {
    return Math.ceil(this.total / (this.filter.limit || 10));
  }

  askDelete(author: Author): void {
    this.authorsService.delete(author.id).subscribe(() => this.loadItems());
  }
}
