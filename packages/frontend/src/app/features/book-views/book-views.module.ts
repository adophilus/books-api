import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Translation, TRANSLOCO_SCOPE } from "@ngneat/transloco";
import { SupportedLanguages } from "../../transloco-loader";
import { BookViewsRoutingModule } from "./book-views-routing.module";
import { BookViewsFormComponent } from "./components/book-views-form/book-views-form.component";
import { BookViewsDatatableComponent } from "./components/book-views-datatable/book-views-datatable.component";
import { BookViewsListPageComponent } from "./pages/book-views-list-page/book-views-list-page.component";
import { BookViewsCreatePageComponent } from "./pages/book-views-create-page/book-views-create-page.component";
import { BookViewsDetailsPageComponent } from "./pages/book-views-details-page/book-views-details-page.component";
import { BookViewsUpdatePageComponent } from "./pages/book-views-update-page/book-views-update-page.component";

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
    BookViewsRoutingModule,
    BookViewsFormComponent,
    BookViewsDatatableComponent,
    BookViewsListPageComponent,
    BookViewsCreatePageComponent,
    BookViewsDetailsPageComponent,
    BookViewsUpdatePageComponent,
  ],
  providers: [
    {
      multi: true,
      provide: TRANSLOCO_SCOPE,
      useValue: { scope: "book-views", loader },
    },
  ],
})
export class BookViewsModule {}
