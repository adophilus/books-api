import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { TranslocoService, TranslocoModule } from "@ngneat/transloco";

import { BaseListPageComponent } from "@1hand/pages/base-list-page/base-list-page.component";
import { Author } from "../../authors.types";
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
    TranslocoModule,
  ],
  templateUrl: "./authors-list-page.component.html",
})
export class AuthorsListPageComponent
  extends BaseListPageComponent<Author>
  implements OnInit
{
  moduleName = "authors";
  search = "";

  constructor(
    service: AuthorsService,
    route: ActivatedRoute,
    router: Router,
    transloco: TranslocoService,
    dialog: MatDialog
  ) {
    super(service, route, router, transloco, dialog);
  }

  protected onParamsInit(params: any): void {
    this.search = params["search"] || "";
  }

  protected getListParams(): any {
    return {
      page: this.page,
      limit: this.limit,
      search: this.search || undefined,
    };
  }

  protected getItemId(item: Author): string {
    return item.id;
  }

  protected getItemLabel(item: Author): string {
    return item.name;
  }

  protected getDeleteTitle(item: Author): string {
    return this.transloco.translate(`${this.moduleName}.delete.title`, {
      name: item.name,
    });
  }

  protected getDeleteMessage(item: Author): string {
    return this.transloco.translate(`${this.moduleName}.delete.message`, {
      name: item.name,
    });
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.updateQueryParams();
    this.loadItems();
  }

  handleCreate(): void {
    this.router.navigate(["./create"], { relativeTo: this.route });
  }

  handleView(item: Author): void {
    this.router.navigate(["./", item.id], { relativeTo: this.route });
  }

  handleUpdate(item: Author): void {
    this.router.navigate(["./", item.id, "update"], { relativeTo: this.route });
  }

  override handleDelete(item: Author): void {
    super.handleDelete(item);
  }
}
