import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", loadComponent: () => import("./pages/videos-list-page/videos-list-page.component").then(m => m.VideosListPageComponent) },
  { path: "create", loadComponent: () => import("./pages/videos-create-page/videos-create-page.component").then(m => m.VideosCreatePageComponent) },
  { path: ":id/update", loadComponent: () => import("./pages/videos-update-page/videos-update-page.component").then(m => m.VideosUpdatePageComponent) },
  { path: ":id/views", loadComponent: () => import("../video-views/pages/video-views-list-page/video-views-list-page.component").then(m => m.VideoViewsListPageComponent) },
  { path: ":id/comments", loadComponent: () => import("../video-comments/pages/video-comments-list-page/video-comments-list-page.component").then(m => m.VideoCommentsListPageComponent) },
  { path: ":id", loadComponent: () => import("./pages/videos-details-page/videos-details-page.component").then(m => m.VideosDetailsPageComponent) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideosRoutingModule {}
