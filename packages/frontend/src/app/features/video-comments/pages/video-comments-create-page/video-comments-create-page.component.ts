import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { TranslocoService } from "@ngneat/transloco";

import { BaseCreatePageComponent } from "@1hand/pages/base-create-page/base-create-page.component";
import { CreateVideoCommentDto, VideoComment, VideoCommentsModuleRoot } from "../../video-comments.types";
import { VideoCommentsService } from "../../video-comments.service";
import { VideoCommentsFormComponent } from "../../components/video-comments-form/video-comments-form.component";

@Component({
  selector: "app-video-comments-create-page",
  standalone: true,
  imports: [VideoCommentsFormComponent],
  templateUrl: "./video-comments-create-page.component.html",
})
export class VideoCommentsCreatePageComponent extends BaseCreatePageComponent<CreateVideoCommentDto, VideoComment> implements OnInit {
  moduleName = VideoCommentsModuleRoot;

  constructor(
    protected override service: VideoCommentsService,
    protected override dialog: MatDialog,
    protected override transloco: TranslocoService,
    protected override router: Router,
    protected override route: ActivatedRoute
  ) { super(service, dialog, transloco, router, route); }

  protected override onInitParams(): void {}
  protected override buildPayload(formData: any): CreateVideoCommentDto {
    return { videoId: formData.videoId, authorId: formData.authorId, content: formData.content };
  }
  protected override getItemLabel(item: VideoComment): string { return item.content?.substring(0, 30) || item.id; }
}
