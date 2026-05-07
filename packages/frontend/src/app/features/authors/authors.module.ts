import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Translation, TRANSLOCO_SCOPE } from "@ngneat/transloco";
import { SupportedLanguages } from "../../transloco-loader";
import { AuthorsRoutingModule } from "./authors-routing.module";
import { AuthorsFormComponent } from "./components/authors-form/authors-form.component";
import { AuthorsDatatableComponent } from "./components/authors-datatable/authors-datatable.component";
import { AuthorsListPageComponent } from "./pages/authors-list-page/authors-list-page.component";
import { AuthorsCreatePageComponent } from "./pages/authors-create-page/authors-create-page.component";
import { AuthorsDetailsPageComponent } from "./pages/authors-details-page/authors-details-page.component";
import { AuthorsUpdatePageComponent } from "./pages/authors-update-page/authors-update-page.component";

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
    AuthorsRoutingModule,
    AuthorsFormComponent,
    AuthorsDatatableComponent,
    AuthorsListPageComponent,
    AuthorsCreatePageComponent,
    AuthorsDetailsPageComponent,
    AuthorsUpdatePageComponent,
  ],
  providers: [
    {
      multi: true,
      provide: TRANSLOCO_SCOPE,
      useValue: { scope: "authors", loader },
    },
  ],
})
export class AuthorsModule {}
