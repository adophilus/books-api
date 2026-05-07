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
  datatableColumns: GenericDatatableColumnDef<Author>[] = DatatableColumns;

  @Input() items: Author[] = [];
  @Input() isLoading = false;
  @Input() hasError = false;

  @Output() create = new EventEmitter<void>();
  @Output() view = new EventEmitter<Author>();
  @Output() update = new EventEmitter<Author>();
  @Output() delete = new EventEmitter<Author>();
}
