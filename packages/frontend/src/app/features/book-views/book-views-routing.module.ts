import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", loadComponent: () => import("./pages/book-views-list-page/book-views-list-page.component").then(m => m.BookViewsListPageComponent) },
  { path: "create", loadComponent: () => import("./pages/book-views-create-page/book-views-create-page.component").then(m => m.BookViewsCreatePageComponent) },
  { path: ":id/update", loadComponent: () => import("./pages/book-views-update-page/book-views-update-page.component").then(m => m.BookViewsUpdatePageComponent) },
  { path: ":id", loadComponent: () => import("./pages/book-views-details-page/book-views-details-page.component").then(m => m.BookViewsDetailsPageComponent) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookViewsRoutingModule {}
