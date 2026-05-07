import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Translation, TRANSLOCO_SCOPE } from "@ngneat/transloco";
import { SupportedLanguages } from "../../transloco-loader";
import { VideoViewsRoutingModule } from "./video-views-routing.module";
import { VideoViewsFormComponent } from "./components/video-views-form/video-views-form.component";
import { VideoViewsDatatableComponent } from "./components/video-views-datatable/video-views-datatable.component";
import { VideoViewsListPageComponent } from "./pages/video-views-list-page/video-views-list-page.component";
import { VideoViewsCreatePageComponent } from "./pages/video-views-create-page/video-views-create-page.component";
import { VideoViewsDetailsPageComponent } from "./pages/video-views-details-page/video-views-details-page.component";
import { VideoViewsUpdatePageComponent } from "./pages/video-views-update-page/video-views-update-page.component";

export const loader: Record<string, () => Promise<Translation>> = SupportedLanguages.reduce(
  (acc, lang) => {
    acc[lang] = () => import(`./i18n/${lang}.json`);
    return acc;
  },
  {} as Record<string, () => Promise<Translation>>,
);

@NgModule({
  imports: [
    CommonModule,
    VideoViewsRoutingModule,
    VideoViewsFormComponent,
    VideoViewsDatatableComponent,
    VideoViewsListPageComponent,
    VideoViewsCreatePageComponent,
    VideoViewsDetailsPageComponent,
    VideoViewsUpdatePageComponent,
  ],
  providers: [
    {
      multi: true,
      provide: TRANSLOCO_SCOPE,
      useValue: { scope: "video-views", loader },
    },
  ],
})
export class VideoViewsModule {}
