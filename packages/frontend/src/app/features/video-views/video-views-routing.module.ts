import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VideoViewsListPageComponent } from "./pages/video-views-list-page/video-views-list-page.component";
import { VideoViewsCreatePageComponent } from "./pages/video-views-create-page/video-views-create-page.component";
import { VideoViewsUpdatePageComponent } from "./pages/video-views-update-page/video-views-update-page.component";
import { VideoViewsDetailsPageComponent } from "./pages/video-views-details-page/video-views-details-page.component";

const routes: Routes = [
  { path: "", component: VideoViewsListPageComponent },
  { path: "create", component: VideoViewsCreatePageComponent },
  { path: ":id/update", component: VideoViewsUpdatePageComponent },
  { path: ":id", component: VideoViewsDetailsPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoViewsRoutingModule {}
