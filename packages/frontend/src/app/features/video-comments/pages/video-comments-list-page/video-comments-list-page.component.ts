import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { TranslocoService, TranslocoModule } from "@ngneat/transloco";

import { BaseListPageComponent } from "@1hand/pages/base-list-page/base-list-page.component";
import { VideoComment } from "../../video-comments.types";
import { VideoCommentsService } from "../../video-comments.service";
import { VideoCommentsDatatableComponent } from "../../components/video-comments-datatable/video-comments-datatable.component";
import { GenericPaginatorComponent } from "@1hand/components/generic-paginator/generic-paginator.component";
import { GenericErrorComponent } from "@1hand/components/generic-error/generic-error.component";

@Component({
  selector: "app-video-comments-list-page",
  standalone: true,
  imports: [CommonModule, VideoCommentsDatatableComponent, GenericPaginatorComponent, GenericErrorComponent, TranslocoModule],
  templateUrl: "./video-comments-list-page.component.html",
})
export class VideoCommentsListPageComponent extends BaseListPageComponent<VideoComment> implements OnInit {
  moduleName = "video-comments";
  videoId: string | undefined;

  constructor(service: VideoCommentsService, route: ActivatedRoute, router: Router, transloco: TranslocoService, dialog: MatDialog) {
    super(service, route, router, transloco, dialog);
  }

  protected onParamsInit(params: any): void { this.videoId = params["videoId"] || undefined; }
  protected getListParams(): any { return { page: this.page, limit: this.limit, videoId: this.videoId }; }
  protected getItemId(item: VideoComment): string { return item.id; }
  protected getItemLabel(item: VideoComment): string { return item.content?.substring(0, 30) || item.id; }
  protected getDeleteTitle(item: VideoComment): string { return this.transloco.translate(`${this.moduleName}.delete.title`); }
  protected getDeleteMessage(item: VideoComment): string { return this.transloco.translate(`${this.moduleName}.delete.message`); }

  onPageChange(newPage: number): void { this.page = newPage; this.updateQueryParams(); this.loadItems(); }
  handleCreate(): void { this.router.navigate(["./create"], { relativeTo: this.route }); }
  handleView(item: VideoComment): void { this.router.navigate(["./", item.id], { relativeTo: this.route }); }
  handleUpdate(item: VideoComment): void { this.router.navigate(["./", item.id, "update"], { relativeTo: this.route }); }
  override handleDelete(item: VideoComment): void { super.handleDelete(item); }
}
