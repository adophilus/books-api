import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BooksListPageComponent } from "./pages/books-list-page/books-list-page.component";
import { BooksCreatePageComponent } from "./pages/books-create-page/books-create-page.component";
import { BooksUpdatePageComponent } from "./pages/books-update-page/books-update-page.component";
import { BooksDetailsPageComponent } from "./pages/books-details-page/books-details-page.component";
import { BookViewsListPageComponent } from "../book-views/pages/book-views-list-page/book-views-list-page.component";
import { BookCommentsListPageComponent } from "../book-comments/pages/book-comments-list-page/book-comments-list-page.component";

const routes: Routes = [
  { path: "", component: BooksListPageComponent },
  { path: "create", component: BooksCreatePageComponent },
  { path: ":id/update", component: BooksUpdatePageComponent },
  { path: ":id/views", component: BookViewsListPageComponent },
  { path: ":id/comments", component: BookCommentsListPageComponent },
  { path: ":id", component: BooksDetailsPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
