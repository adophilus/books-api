import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Translation, TRANSLOCO_SCOPE } from "@ngneat/transloco";
import { SupportedLanguages } from "../../transloco-loader";
import { BookCommentsRoutingModule } from "./book-comments-routing.module";
import { BookCommentsFormComponent } from "./components/book-comments-form/book-comments-form.component";
import { BookCommentsDatatableComponent } from "./components/book-comments-datatable/book-comments-datatable.component";
import { BookCommentsListPageComponent } from "./pages/book-comments-list-page/book-comments-list-page.component";
import { BookCommentsCreatePageComponent } from "./pages/book-comments-create-page/book-comments-create-page.component";
import { BookCommentsDetailsPageComponent } from "./pages/book-comments-details-page/book-comments-details-page.component";
import { BookCommentsUpdatePageComponent } from "./pages/book-comments-update-page/book-comments-update-page.component";

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
    BookCommentsRoutingModule,
    BookCommentsFormComponent,
    BookCommentsDatatableComponent,
    BookCommentsListPageComponent,
    BookCommentsCreatePageComponent,
    BookCommentsDetailsPageComponent,
    BookCommentsUpdatePageComponent,
  ],
  providers: [
    {
      multi: true,
      provide: TRANSLOCO_SCOPE,
      useValue: { scope: "book-comments", loader },
    },
  ],
})
export class BookCommentsModule {}
