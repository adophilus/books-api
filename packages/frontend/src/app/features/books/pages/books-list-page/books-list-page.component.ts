import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { TranslocoService, TranslocoModule } from "@ngneat/transloco";

import { BaseListPageComponent } from "@1hand/pages/base-list-page/base-list-page.component";
import { Book } from "../../books.types";
import { BooksService } from "../../books.service";
import { BooksDatatableComponent } from "../../components/books-datatable/books-datatable.component";
import { GenericPaginatorComponent } from "@1hand/components/generic-paginator/generic-paginator.component";
import { GenericErrorComponent } from "@1hand/components/generic-error/generic-error.component";

@Component({
  selector: "app-books-list-page",
  standalone: true,
  imports: [CommonModule, BooksDatatableComponent, GenericPaginatorComponent, GenericErrorComponent, TranslocoModule],
  templateUrl: "./books-list-page.component.html",
})
export class BooksListPageComponent extends BaseListPageComponent<Book> implements OnInit {
  moduleName = "books";
  search = "";

  constructor(service: BooksService, route: ActivatedRoute, router: Router, transloco: TranslocoService, dialog: MatDialog) {
    super(service, route, router, transloco, dialog);
  }

  protected onParamsInit(params: any): void { this.search = params["search"] || ""; }
  protected getListParams(): any { return { page: this.page, limit: this.limit, search: this.search || undefined }; }
  protected getItemId(item: Book): string { return item.id; }
  protected getItemLabel(item: Book): string { return item.title; }
  protected getDeleteTitle(item: Book): string { return this.transloco.translate(`${this.moduleName}.delete.title`, { name: item.title }); }
  protected getDeleteMessage(item: Book): string { return this.transloco.translate(`${this.moduleName}.delete.message`, { name: item.title }); }

  onPageChange(newPage: number): void { this.page = newPage; this.updateQueryParams(); this.loadItems(); }
  handleCreate(): void { this.router.navigate(["./create"], { relativeTo: this.route }); }
  handleView(item: Book): void { this.router.navigate(["./", item.id], { relativeTo: this.route }); }
  handleUpdate(item: Book): void { this.router.navigate(["./", item.id, "update"], { relativeTo: this.route }); }
  override handleDelete(item: Book): void { super.handleDelete(item); }
}
