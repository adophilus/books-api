import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", loadComponent: () => import("./pages/video-views-list-page/video-views-list-page.component").then(m => m.VideoViewsListPageComponent) },
  { path: "create", loadComponent: () => import("./pages/video-views-create-page/video-views-create-page.component").then(m => m.VideoViewsCreatePageComponent) },
  { path: ":id/update", loadComponent: () => import("./pages/video-views-update-page/video-views-update-page.component").then(m => m.VideoViewsUpdatePageComponent) },
  { path: ":id", loadComponent: () => import("./pages/video-views-details-page/video-views-details-page.component").then(m => m.VideoViewsDetailsPageComponent) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoViewsRoutingModule {}
