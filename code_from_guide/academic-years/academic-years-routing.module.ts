import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AcademicYearsListPageComponent } from "./pages/academic-years-list-page/academic-years-list-page.component";
import { AcademicYearsCreatePageComponent } from "./pages/academic-years-create-page/academic-years-create-page.component";
import { AcademicYearsDetailsPageComponent } from "./pages/academic-years-details-page/academic-years-details-page.component";
import { AcademicYearsUpdatePageComponent } from "./pages/academic-years-update-page/academic-years-update-page.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "list",
    pathMatch: "full",
  },
  {
    path: "list",
    component: AcademicYearsListPageComponent,
  },
  {
    path: "create",
    component: AcademicYearsCreatePageComponent,
  },
  {
    path: "update/:code",
    component: AcademicYearsUpdatePageComponent,
  },
  {
    path: ":code",
    component: AcademicYearsDetailsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcademicYearsRoutingModule {}
