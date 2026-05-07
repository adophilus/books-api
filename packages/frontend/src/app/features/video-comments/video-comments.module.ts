import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Translation, TRANSLOCO_SCOPE } from "@ngneat/transloco";
import { SupportedLanguages } from "../../transloco-loader";
import { VideoCommentsRoutingModule } from "./video-comments-routing.module";
import { VideoCommentsFormComponent } from "./components/video-comments-form/video-comments-form.component";
import { VideoCommentsDatatableComponent } from "./components/video-comments-datatable/video-comments-datatable.component";
import { VideoCommentsListPageComponent } from "./pages/video-comments-list-page/video-comments-list-page.component";
import { VideoCommentsCreatePageComponent } from "./pages/video-comments-create-page/video-comments-create-page.component";
import { VideoCommentsDetailsPageComponent } from "./pages/video-comments-details-page/video-comments-details-page.component";
import { VideoCommentsUpdatePageComponent } from "./pages/video-comments-update-page/video-comments-update-page.component";

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
    VideoCommentsRoutingModule,
    VideoCommentsFormComponent,
    VideoCommentsDatatableComponent,
    VideoCommentsListPageComponent,
    VideoCommentsCreatePageComponent,
    VideoCommentsDetailsPageComponent,
    VideoCommentsUpdatePageComponent,
  ],
  providers: [
    {
      multi: true,
      provide: TRANSLOCO_SCOPE,
      useValue: { scope: "video-comments", loader },
    },
  ],
})
export class VideoCommentsModule {}
