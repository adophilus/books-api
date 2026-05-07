import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", loadComponent: () => import("./pages/book-comments-list-page/book-comments-list-page.component").then(m => m.BookCommentsListPageComponent) },
  { path: "create", loadComponent: () => import("./pages/book-comments-create-page/book-comments-create-page.component").then(m => m.BookCommentsCreatePageComponent) },
  { path: ":id/update", loadComponent: () => import("./pages/book-comments-update-page/book-comments-update-page.component").then(m => m.BookCommentsUpdatePageComponent) },
  { path: ":id", loadComponent: () => import("./pages/book-comments-details-page/book-comments-details-page.component").then(m => m.BookCommentsDetailsPageComponent) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookCommentsRoutingModule {}
