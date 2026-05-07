import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", loadComponent: () => import("./pages/authors-list-page/authors-list-page.component").then(m => m.AuthorsListPageComponent) },
  { path: "create", loadComponent: () => import("./pages/authors-create-page/authors-create-page.component").then(m => m.AuthorsCreatePageComponent) },
  { path: ":id/update", loadComponent: () => import("./pages/authors-update-page/authors-update-page.component").then(m => m.AuthorsUpdatePageComponent) },
  { path: ":id/books", loadComponent: () => import("../books/pages/books-list-page/books-list-page.component").then(m => m.BooksListPageComponent) },
  { path: ":id/videos", loadComponent: () => import("../videos/pages/videos-list-page/videos-list-page.component").then(m => m.VideosListPageComponent) },
  { path: ":id/book-comments", loadComponent: () => import("../book-comments/pages/book-comments-list-page/book-comments-list-page.component").then(m => m.BookCommentsListPageComponent) },
  { path: ":id/video-comments", loadComponent: () => import("../video-comments/pages/video-comments-list-page/video-comments-list-page.component").then(m => m.VideoCommentsListPageComponent) },
  { path: ":id", loadComponent: () => import("./pages/authors-details-page/authors-details-page.component").then(m => m.AuthorsDetailsPageComponent) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorsRoutingModule {}
