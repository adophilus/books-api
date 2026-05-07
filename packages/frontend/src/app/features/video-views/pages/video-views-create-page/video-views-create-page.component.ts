import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { TranslocoService } from "@ngneat/transloco";

import { BaseCreatePageComponent } from "@1hand/pages/base-create-page/base-create-page.component";
import { CreateVideoViewDto, VideoView, VideoViewsModuleRoot } from "../../video-views.types";
import { VideoViewsService } from "../../video-views.service";
import { VideoViewsFormComponent } from "../../components/video-views-form/video-views-form.component";

@Component({
  selector: "app-video-views-create-page",
  standalone: true,
  imports: [VideoViewsFormComponent],
  templateUrl: "./video-views-create-page.component.html",
})
export class VideoViewsCreatePageComponent extends BaseCreatePageComponent<CreateVideoViewDto, VideoView> implements OnInit {
  moduleName = VideoViewsModuleRoot;

  constructor(
    protected override service: VideoViewsService,
    protected override dialog: MatDialog,
    protected override transloco: TranslocoService,
    protected override router: Router,
    protected override route: ActivatedRoute
  ) { super(service, dialog, transloco, router, route); }

  protected override onInitParams(): void {}
  protected override buildPayload(formData: any): CreateVideoViewDto {
    return { videoId: formData.videoId, authorId: formData.authorId };
  }
  protected override getItemLabel(item: VideoView): string { return item.id; }
}
