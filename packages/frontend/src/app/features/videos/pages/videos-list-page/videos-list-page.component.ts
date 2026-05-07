import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { TranslocoService, TranslocoModule } from "@ngneat/transloco";

import { BaseListPageComponent } from "@1hand/pages/base-list-page/base-list-page.component";
import { Video } from "../../videos.types";
import { VideosService } from "../../videos.service";
import { VideosDatatableComponent } from "../../components/videos-datatable/videos-datatable.component";
import { GenericPaginatorComponent } from "@1hand/components/generic-paginator/generic-paginator.component";
import { GenericErrorComponent } from "@1hand/components/generic-error/generic-error.component";

@Component({
  selector: "app-videos-list-page",
  standalone: true,
  imports: [CommonModule, VideosDatatableComponent, GenericPaginatorComponent, GenericErrorComponent, TranslocoModule],
  templateUrl: "./videos-list-page.component.html",
})
export class VideosListPageComponent extends BaseListPageComponent<Video> implements OnInit {
  moduleName = "videos";
  search = "";

  constructor(service: VideosService, route: ActivatedRoute, router: Router, transloco: TranslocoService, dialog: MatDialog) {
    super(service, route, router, transloco, dialog);
  }

  protected onParamsInit(params: any): void { this.search = params["search"] || ""; }
  protected getListParams(): any { return { page: this.page, limit: this.limit, search: this.search || undefined }; }
  protected getItemId(item: Video): string { return item.id; }
  protected getItemLabel(item: Video): string { return item.title; }
  protected getDeleteTitle(item: Video): string { return this.transloco.translate(`${this.moduleName}.delete.title`, { name: item.title }); }
  protected getDeleteMessage(item: Video): string { return this.transloco.translate(`${this.moduleName}.delete.message`, { name: item.title }); }

  onPageChange(newPage: number): void { this.page = newPage; this.updateQueryParams(); this.loadItems(); }
  handleCreate(): void { this.router.navigate(["./create"], { relativeTo: this.route }); }
  handleView(item: Video): void { this.router.navigate(["./", item.id], { relativeTo: this.route }); }
  handleUpdate(item: Video): void { this.router.navigate(["./", item.id, "update"], { relativeTo: this.route }); }
  override handleDelete(item: Video): void { super.handleDelete(item); }
}
