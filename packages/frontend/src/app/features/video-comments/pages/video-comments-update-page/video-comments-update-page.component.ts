import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { TranslocoService } from "@ngneat/transloco";

import { BaseUpdatePageComponent } from "@1hand/pages/base-update-page/base-update-page.component";
import { UpdateVideoCommentDto, VideoComment, VideoCommentsModuleRoot } from "../../video-comments.types";
import { VideoCommentsService } from "../../video-comments.service";
import { VideoCommentsFormComponent } from "../../components/video-comments-form/video-comments-form.component";

@Component({
  selector: "app-video-comments-update-page",
  standalone: true,
  imports: [VideoCommentsFormComponent],
  templateUrl: "./video-comments-update-page.component.html",
})
export class VideoCommentsUpdatePageComponent extends BaseUpdatePageComponent<UpdateVideoCommentDto, VideoComment> implements OnInit {
  moduleName = VideoCommentsModuleRoot;

  constructor(
    protected override service: VideoCommentsService,
    protected override dialog: MatDialog,
    protected override transloco: TranslocoService,
    protected override router: Router,
    protected override route: ActivatedRoute
  ) { super(service, dialog, transloco, router, route); }

  protected getItemIdParamName(): string { return "id"; }
  protected override buildPayload(formData: any): UpdateVideoCommentDto {
    return { content: formData.content };
  }
  protected override getItemLabel(item: VideoComment): string { return item.content?.substring(0, 30) || item.id; }
}
