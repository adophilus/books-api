import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LabComponent } from "./lab.component";
import { GenericDatatableLabComponent } from "./components/generic-datatable-lab/generic-datatable-lab.component";
import { Route, RouterModule } from "@angular/router";
import { GenericDatatableComponent } from "../../components/generic-datatable/generic-datatable.component";

const routes: Route[] = [{ path: "", component: LabComponent }];

@NgModule({
  declarations: [LabComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    // GenericDatatable
    GenericDatatableComponent,
    GenericDatatableLabComponent,
  ],
})
export class LabModule {}
