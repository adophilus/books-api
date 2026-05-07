import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CoreModule } from "@modules/core/core.module";
import { SharedModule } from "@modules/shared/shared.module";
import { Translation, TRANSLOCO_SCOPE } from "@ngneat/transloco";
import { AcademicYearsRoutingModule as ModuleRoutingModule } from "./academic-years-routing.module";
import { SupportedLanguages } from "../../transloco-loader";
import { AcademicYearsListComponent } from "./components/academic-years-list/academic-years-list.component";
import { AcademicYearsDatatableComponent } from "./components/academic-years-datatable/academic-years-datatable.component";
import { AcademicYearsFormComponent } from "./components/academic-years-form/academic-years-form.component";
import { AcademicYearsListPageComponent } from "./pages/academic-years-list-page/academic-years-list-page.component";
import { AcademicYearsCreatePageComponent } from "./pages/academic-years-create-page/academic-years-create-page.component";
import { AcademicYearsDetailsPageComponent } from "./pages/academic-years-details-page/academic-years-details-page.component";
import { LoaderComponent } from "@modules/core/components/loader.component";
import { AcademicYearsUpdatePageComponent } from "./pages/academic-years-update-page/academic-years-update-page.component";

export const loader: Record<string, () => Promise<Translation>> =
  SupportedLanguages.reduce((acc, lang) => {
    acc[lang] = () => import(`./i18n/${lang}.json`);
    return acc;
  }, {} as Record<string, () => Promise<Translation>>);

const toExport: any = [
  // Components
  AcademicYearsListComponent,
  AcademicYearsDatatableComponent,
  AcademicYearsFormComponent,

  // Pages
  AcademicYearsListPageComponent,
  AcademicYearsCreatePageComponent,
  AcademicYearsDetailsPageComponent,
  AcademicYearsUpdatePageComponent,
];

@NgModule({
  declarations: [toExport],
  imports: [CommonModule, ModuleRoutingModule, CoreModule, SharedModule],
  providers: [
    {
      multi: true,
      provide: TRANSLOCO_SCOPE,
      useValue: {
        scope: "academicyears",
        loader,
      },
    },
  ],
  exports: [toExport],
})
export class AcademicYearsModule {}
