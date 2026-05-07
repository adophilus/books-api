import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VideosListPageComponent } from "./pages/videos-list-page/videos-list-page.component";
import { VideosCreatePageComponent } from "./pages/videos-create-page/videos-create-page.component";
import { VideosUpdatePageComponent } from "./pages/videos-update-page/videos-update-page.component";
import { VideosDetailsPageComponent } from "./pages/videos-details-page/videos-details-page.component";
import { VideoViewsListPageComponent } from "../video-views/pages/video-views-list-page/video-views-list-page.component";
import { VideoCommentsListPageComponent } from "../video-comments/pages/video-comments-list-page/video-comments-list-page.component";

const routes: Routes = [
  { path: "", component: VideosListPageComponent },
  { path: "create", component: VideosCreatePageComponent },
  { path: ":id/update", component: VideosUpdatePageComponent },
  { path: ":id/views", component: VideoViewsListPageComponent },
  { path: ":id/comments", component: VideoCommentsListPageComponent },
  { path: ":id", component: VideosDetailsPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideosRoutingModule {}
