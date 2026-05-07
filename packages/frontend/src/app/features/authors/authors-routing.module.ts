import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthorsListPageComponent } from "./pages/authors-list-page/authors-list-page.component";
import { AuthorsCreatePageComponent } from "./pages/authors-create-page/authors-create-page.component";
import { AuthorsUpdatePageComponent } from "./pages/authors-update-page/authors-update-page.component";
import { AuthorsDetailsPageComponent } from "./pages/authors-details-page/authors-details-page.component";
import { BooksListPageComponent } from "../books/pages/books-list-page/books-list-page.component";
import { VideosListPageComponent } from "../videos/pages/videos-list-page/videos-list-page.component";
import { BookCommentsListPageComponent } from "../book-comments/pages/book-comments-list-page/book-comments-list-page.component";
import { VideoCommentsListPageComponent } from "../video-comments/pages/video-comments-list-page/video-comments-list-page.component";

const routes: Routes = [
  { path: "", component: AuthorsListPageComponent },
  { path: "create", component: AuthorsCreatePageComponent },
  { path: ":id/update", component: AuthorsUpdatePageComponent },
  { path: ":id/books", component: BooksListPageComponent },
  { path: ":id/videos", component: VideosListPageComponent },
  { path: ":id/book-comments", component: BookCommentsListPageComponent },
  { path: ":id/video-comments", component: VideoCommentsListPageComponent },
  { path: ":id", component: AuthorsDetailsPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorsRoutingModule {}
