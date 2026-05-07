import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", loadComponent: () => import("./pages/books-list-page/books-list-page.component").then(m => m.BooksListPageComponent) },
  { path: "create", loadComponent: () => import("./pages/books-create-page/books-create-page.component").then(m => m.BooksCreatePageComponent) },
  { path: ":id/update", loadComponent: () => import("./pages/books-update-page/books-update-page.component").then(m => m.BooksUpdatePageComponent) },
  { path: ":id/views", loadComponent: () => import("../book-views/pages/book-views-list-page/book-views-list-page.component").then(m => m.BookViewsListPageComponent) },
  { path: ":id/comments", loadComponent: () => import("../book-comments/pages/book-comments-list-page/book-comments-list-page.component").then(m => m.BookCommentsListPageComponent) },
  { path: ":id", loadComponent: () => import("./pages/books-details-page/books-details-page.component").then(m => m.BooksDetailsPageComponent) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
