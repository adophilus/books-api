import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { TranslocoService } from "@ngneat/transloco";

import { BaseUpdatePageComponent } from "@1hand/pages/base-update-page/base-update-page.component";
import { UpdateVideoDto, Video, VideosModuleRoot } from "../../videos.types";
import { VideosService } from "../../videos.service";
import { VideosFormComponent } from "../../components/videos-form/videos-form.component";

@Component({
  selector: "app-videos-update-page",
  standalone: true,
  imports: [VideosFormComponent],
  templateUrl: "./videos-update-page.component.html",
})
export class VideosUpdatePageComponent extends BaseUpdatePageComponent<UpdateVideoDto, Video> implements OnInit {
  moduleName = VideosModuleRoot;

  constructor(
    protected override service: VideosService,
    protected override dialog: MatDialog,
    protected override transloco: TranslocoService,
    protected override router: Router,
    protected override route: ActivatedRoute
  ) { super(service, dialog, transloco, router, route); }

  protected getItemIdParamName(): string { return "id"; }
  protected override buildPayload(formData: any): UpdateVideoDto {
    return { title: formData.title, description: formData.description || undefined, url: formData.url };
  }
  protected override getItemLabel(item: Video): string { return item.title; }
}
