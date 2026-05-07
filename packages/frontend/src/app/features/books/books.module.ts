import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Translation, TRANSLOCO_SCOPE } from "@ngneat/transloco";
import { SupportedLanguages } from "../../transloco-loader";
import { BooksRoutingModule } from "./books-routing.module";
import { BooksFormComponent } from "./components/books-form/books-form.component";
import { BooksDatatableComponent } from "./components/books-datatable/books-datatable.component";
import { BooksListPageComponent } from "./pages/books-list-page/books-list-page.component";
import { BooksCreatePageComponent } from "./pages/books-create-page/books-create-page.component";
import { BooksDetailsPageComponent } from "./pages/books-details-page/books-details-page.component";
import { BooksUpdatePageComponent } from "./pages/books-update-page/books-update-page.component";

export const loader: Record<string, () => Promise<Translation>> = SupportedLanguages.reduce(
  (acc, lang) => {
    acc[lang] = () => import(`./i18n/${lang}.json`);
    return acc;
  },
  {} as Record<string, () => Promise<Translation>>,
);

@NgModule({
  imports: [
    CommonModule,
    BooksRoutingModule,
    BooksFormComponent,
    BooksDatatableComponent,
    BooksListPageComponent,
    BooksCreatePageComponent,
    BooksDetailsPageComponent,
    BooksUpdatePageComponent,
  ],
  providers: [
    {
      multi: true,
      provide: TRANSLOCO_SCOPE,
      useValue: { scope: "books", loader },
    },
  ],
})
export class BooksModule {}
