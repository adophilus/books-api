import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VideoCommentsListPageComponent } from "./pages/video-comments-list-page/video-comments-list-page.component";
import { VideoCommentsCreatePageComponent } from "./pages/video-comments-create-page/video-comments-create-page.component";
import { VideoCommentsUpdatePageComponent } from "./pages/video-comments-update-page/video-comments-update-page.component";
import { VideoCommentsDetailsPageComponent } from "./pages/video-comments-details-page/video-comments-details-page.component";

const routes: Routes = [
  { path: "", component: VideoCommentsListPageComponent },
  { path: "create", component: VideoCommentsCreatePageComponent },
  { path: ":id/update", component: VideoCommentsUpdatePageComponent },
  { path: ":id", component: VideoCommentsDetailsPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoCommentsRoutingModule {}
