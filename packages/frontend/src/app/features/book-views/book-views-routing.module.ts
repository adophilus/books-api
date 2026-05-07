import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BookViewsListPageComponent } from "./pages/book-views-list-page/book-views-list-page.component";
import { BookViewsCreatePageComponent } from "./pages/book-views-create-page/book-views-create-page.component";
import { BookViewsUpdatePageComponent } from "./pages/book-views-update-page/book-views-update-page.component";
import { BookViewsDetailsPageComponent } from "./pages/book-views-details-page/book-views-details-page.component";

const routes: Routes = [
  { path: "", component: BookViewsListPageComponent },
  { path: "create", component: BookViewsCreatePageComponent },
  { path: ":id/update", component: BookViewsUpdatePageComponent },
  { path: ":id", component: BookViewsDetailsPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookViewsRoutingModule {}
