import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BookCommentsListPageComponent } from "./pages/book-comments-list-page/book-comments-list-page.component";
import { BookCommentsCreatePageComponent } from "./pages/book-comments-create-page/book-comments-create-page.component";
import { BookCommentsUpdatePageComponent } from "./pages/book-comments-update-page/book-comments-update-page.component";
import { BookCommentsDetailsPageComponent } from "./pages/book-comments-details-page/book-comments-details-page.component";

const routes: Routes = [
  { path: "", component: BookCommentsListPageComponent },
  { path: "create", component: BookCommentsCreatePageComponent },
  { path: ":id/update", component: BookCommentsUpdatePageComponent },
  { path: ":id", component: BookCommentsDetailsPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookCommentsRoutingModule {}
