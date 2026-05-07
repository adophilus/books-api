import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { TranslocoService, TranslocoModule } from "@ngneat/transloco";

import { BaseListPageComponent } from "@1hand/pages/base-list-page/base-list-page.component";
import { VideoView } from "../../video-views.types";
import { VideoViewsService } from "../../video-views.service";
import { VideoViewsDatatableComponent } from "../../components/video-views-datatable/video-views-datatable.component";
import { GenericPaginatorComponent } from "@1hand/components/generic-paginator/generic-paginator.component";
import { GenericErrorComponent } from "@1hand/components/generic-error/generic-error.component";

@Component({
  selector: "app-video-views-list-page",
  standalone: true,
  imports: [CommonModule, VideoViewsDatatableComponent, GenericPaginatorComponent, GenericErrorComponent, TranslocoModule],
  templateUrl: "./video-views-list-page.component.html",
})
export class VideoViewsListPageComponent extends BaseListPageComponent<VideoView> implements OnInit {
  moduleName = "video-views";
  videoId: string | undefined;

  constructor(service: VideoViewsService, route: ActivatedRoute, router: Router, transloco: TranslocoService, dialog: MatDialog) {
    super(service, route, router, transloco, dialog);
  }

  protected onParamsInit(params: any): void { this.videoId = params["videoId"] || undefined; }
  protected getListParams(): any { return { page: this.page, limit: this.limit, videoId: this.videoId }; }
  protected getItemId(item: VideoView): string { return item.id; }
  protected getItemLabel(item: VideoView): string { return item.id; }
  protected getDeleteTitle(item: VideoView): string { return this.transloco.translate(`${this.moduleName}.delete.title`); }
  protected getDeleteMessage(item: VideoView): string { return this.transloco.translate(`${this.moduleName}.delete.message`); }

  onPageChange(newPage: number): void { this.page = newPage; this.updateQueryParams(); this.loadItems(); }
  handleCreate(): void { this.router.navigate(["./create"], { relativeTo: this.route }); }
  handleView(item: VideoView): void { this.router.navigate(["./", item.id], { relativeTo: this.route }); }
  override handleDelete(item: VideoView): void { super.handleDelete(item); }
}
