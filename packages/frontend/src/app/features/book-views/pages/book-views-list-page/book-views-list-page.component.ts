import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { TranslocoService, TranslocoModule } from "@ngneat/transloco";

import { BaseListPageComponent } from "@1hand/pages/base-list-page/base-list-page.component";
import { BookView } from "../../book-views.types";
import { BookViewsService } from "../../book-views.service";
import { BookViewsDatatableComponent } from "../../components/book-views-datatable/book-views-datatable.component";
import { GenericPaginatorComponent } from "@1hand/components/generic-paginator/generic-paginator.component";
import { GenericErrorComponent } from "@1hand/components/generic-error/generic-error.component";

@Component({
  selector: "app-book-views-list-page",
  standalone: true,
  imports: [CommonModule, BookViewsDatatableComponent, GenericPaginatorComponent, GenericErrorComponent, TranslocoModule],
  templateUrl: "./book-views-list-page.component.html",
})
export class BookViewsListPageComponent extends BaseListPageComponent<BookView> implements OnInit {
  moduleName = "book-views";
  bookId: string | undefined;

  constructor(service: BookViewsService, route: ActivatedRoute, router: Router, transloco: TranslocoService, dialog: MatDialog) {
    super(service, route, router, transloco, dialog);
  }

  protected onParamsInit(params: any): void { this.bookId = params["bookId"] || undefined; }
  protected getListParams(): any { return { page: this.page, limit: this.limit, bookId: this.bookId }; }
  protected getItemId(item: BookView): string { return item.id; }
  protected getItemLabel(item: BookView): string { return item.id; }
  protected getDeleteTitle(item: BookView): string { return this.transloco.translate(`${this.moduleName}.delete.title`); }
  protected getDeleteMessage(item: BookView): string { return this.transloco.translate(`${this.moduleName}.delete.message`); }

  onPageChange(newPage: number): void { this.page = newPage; this.updateQueryParams(); this.loadItems(); }
  handleCreate(): void { this.router.navigate(["./create"], { relativeTo: this.route }); }
  handleView(item: BookView): void { this.router.navigate(["./", item.id], { relativeTo: this.route }); }
  override handleDelete(item: BookView): void { super.handleDelete(item); }
}
