import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { TranslocoService, TranslocoModule } from "@ngneat/transloco";

import { BaseListPageComponent } from "@1hand/pages/base-list-page/base-list-page.component";
import { BookComment } from "../../book-comments.types";
import { BookCommentsService } from "../../book-comments.service";
import { BookCommentsDatatableComponent } from "../../components/book-comments-datatable/book-comments-datatable.component";
import { GenericPaginatorComponent } from "@1hand/components/generic-paginator/generic-paginator.component";
import { GenericErrorComponent } from "@1hand/components/generic-error/generic-error.component";

@Component({
  selector: "app-book-comments-list-page",
  standalone: true,
  imports: [CommonModule, BookCommentsDatatableComponent, GenericPaginatorComponent, GenericErrorComponent, TranslocoModule],
  templateUrl: "./book-comments-list-page.component.html",
})
export class BookCommentsListPageComponent extends BaseListPageComponent<BookComment> implements OnInit {
  moduleName = "book-comments";
  bookId: string | undefined;

  constructor(service: BookCommentsService, route: ActivatedRoute, router: Router, transloco: TranslocoService, dialog: MatDialog) {
    super(service, route, router, transloco, dialog);
  }

  protected onParamsInit(params: any): void { this.bookId = params["bookId"] || undefined; }
  protected getListParams(): any { return { page: this.page, limit: this.limit, bookId: this.bookId }; }
  protected getItemId(item: BookComment): string { return item.id; }
  protected getItemLabel(item: BookComment): string { return item.content?.substring(0, 30) || item.id; }
  protected getDeleteTitle(item: BookComment): string { return this.transloco.translate(`${this.moduleName}.delete.title`); }
  protected getDeleteMessage(item: BookComment): string { return this.transloco.translate(`${this.moduleName}.delete.message`); }

  onPageChange(newPage: number): void { this.page = newPage; this.updateQueryParams(); this.loadItems(); }
  handleCreate(): void { this.router.navigate(["./create"], { relativeTo: this.route }); }
  handleView(item: BookComment): void { this.router.navigate(["./", item.id], { relativeTo: this.route }); }
  handleUpdate(item: BookComment): void { this.router.navigate(["./", item.id, "update"], { relativeTo: this.route }); }
  override handleDelete(item: BookComment): void { super.handleDelete(item); }
}
