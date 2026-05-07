import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { TranslocoService } from "@ngneat/transloco";

import { BaseCreatePageComponent } from "@1hand/pages/base-create-page/base-create-page.component";
import { CreateVideoDto, Video, VideosModuleRoot } from "../../videos.types";
import { VideosService } from "../../videos.service";
import { VideosFormComponent } from "../../components/videos-form/videos-form.component";

@Component({
  selector: "app-videos-create-page",
  standalone: true,
  imports: [VideosFormComponent],
  templateUrl: "./videos-create-page.component.html",
})
export class VideosCreatePageComponent extends BaseCreatePageComponent<CreateVideoDto, Video> implements OnInit {
  moduleName = VideosModuleRoot;

  constructor(
    protected override service: VideosService,
    protected override dialog: MatDialog,
    protected override transloco: TranslocoService,
    protected override router: Router,
    protected override route: ActivatedRoute
  ) { super(service, dialog, transloco, router, route); }

  protected override onInitParams(): void {}
  protected override buildPayload(formData: any): CreateVideoDto {
    return { title: formData.title, description: formData.description || undefined, url: formData.url, authorId: formData.authorId };
  }
  protected override getItemLabel(item: Video): string { return item.title; }
}
