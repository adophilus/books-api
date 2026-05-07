import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Translation, TRANSLOCO_SCOPE } from "@ngneat/transloco";
import { SupportedLanguages } from "../../transloco-loader";
import { VideosRoutingModule } from "./videos-routing.module";
import { VideosFormComponent } from "./components/videos-form/videos-form.component";
import { VideosDatatableComponent } from "./components/videos-datatable/videos-datatable.component";
import { VideosListPageComponent } from "./pages/videos-list-page/videos-list-page.component";
import { VideosCreatePageComponent } from "./pages/videos-create-page/videos-create-page.component";
import { VideosDetailsPageComponent } from "./pages/videos-details-page/videos-details-page.component";
import { VideosUpdatePageComponent } from "./pages/videos-update-page/videos-update-page.component";

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
    VideosRoutingModule,
    VideosFormComponent,
    VideosDatatableComponent,
    VideosListPageComponent,
    VideosCreatePageComponent,
    VideosDetailsPageComponent,
    VideosUpdatePageComponent,
  ],
  providers: [
    {
      multi: true,
      provide: TRANSLOCO_SCOPE,
      useValue: { scope: "videos", loader },
    },
  ],
})
export class VideosModule {}
