import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", loadComponent: () => import("./pages/video-comments-list-page/video-comments-list-page.component").then(m => m.VideoCommentsListPageComponent) },
  { path: "create", loadComponent: () => import("./pages/video-comments-create-page/video-comments-create-page.component").then(m => m.VideoCommentsCreatePageComponent) },
  { path: ":id/update", loadComponent: () => import("./pages/video-comments-update-page/video-comments-update-page.component").then(m => m.VideoCommentsUpdatePageComponent) },
  { path: ":id", loadComponent: () => import("./pages/video-comments-details-page/video-comments-details-page.component").then(m => m.VideoCommentsDetailsPageComponent) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoCommentsRoutingModule {}
