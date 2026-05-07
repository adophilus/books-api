import { Component, EventEmitter, Input, Output } from "@angular/core";
import { GenericDatatableColumnDef } from "../../../../@1hand/components/generic-datatable/generic-datatable.component";
import { AcademicYear as ModuleObject } from "@modules/academic-years/academic-years.types";
import { DatatableColumns } from "@modules/academic-years/academic-years.config";

@Component({
  selector: "app-academic-years-datatable",
  templateUrl: "./academic-years-datatable.component.html",
  styleUrl: "./academic-years-datatable.component.scss",
})
export class AcademicYearsDatatableComponent {
  datatableColumns: GenericDatatableColumnDef<ModuleObject>[] = [];

  @Input() items: ModuleObject[] = [];

  @Input() errorMessage = "";
  @Input() isLoading = false;
  @Input() hasError = false;

  @Output("view") handleView$: EventEmitter<ModuleObject> = new EventEmitter();
  @Output("update") handleUpdate$: EventEmitter<ModuleObject> =
    new EventEmitter();
  @Output("delete") handleDelete$: EventEmitter<ModuleObject> =
    new EventEmitter();
  @Output("create") handleCreate$: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void {
    this.datatableColumns = DatatableColumns;
  }

  handleView(item: ModuleObject) {
    this.handleView$.emit(item);
  }

  handleUpdate(item: ModuleObject) {
    this.handleUpdate$.emit(item);
  }

  handleDelete(item: ModuleObject) {
    this.handleDelete$.emit(item);
  }

  handleCreate() {
    this.handleCreate$.emit();
  }
}
