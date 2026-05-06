import { Component, EventEmitter, Input, Output } from "@angular/core";
import { GenericDatatableColumnDef, GenericDatatableComponent } from "@1hand/components/generic-datatable/generic-datatable.component";
import { Author } from "../../authors.types";
import { DatatableColumns } from "../../authors.config";

@Component({
  selector: "app-authors-datatable",
  standalone: true,
  imports: [GenericDatatableComponent],
  templateUrl: "./authors-datatable.component.html",
})
export class AuthorsDatatableComponent {
  datatableColumns: GenericDatatableColumnDef<Author>[] = [];

  @Input() items: Author[] = [];
  @Input() isLoading = false;
  @Input() hasError = false;

  @Output("view") handleView$ = new EventEmitter<Author>();
  @Output("update") handleUpdate$ = new EventEmitter<Author>();
  @Output("delete") handleDelete$ = new EventEmitter<Author>();
  @Output("create") handleCreate$ = new EventEmitter<void>();

  ngOnInit(): void {
    this.datatableColumns = DatatableColumns;
  }

  handleView(item: Author) { this.handleView$.emit(item); }
  handleUpdate(item: Author) { this.handleUpdate$.emit(item); }
  handleDelete(item: Author) { this.handleDelete$.emit(item); }
  handleCreate() { this.handleCreate$.emit(); }
}
