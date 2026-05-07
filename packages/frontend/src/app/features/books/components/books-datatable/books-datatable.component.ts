import { Component, EventEmitter, Input, Output } from "@angular/core";
import { GenericDatatableColumnDef, GenericDatatableComponent } from "@1hand/components/generic-datatable/generic-datatable.component";
import { Book } from "../../books.types";
import { DatatableColumns } from "../../books.config";

@Component({
  selector: "app-books-datatable",
  standalone: true,
  imports: [GenericDatatableComponent],
  templateUrl: "./books-datatable.component.html",
})
export class BooksDatatableComponent {
  datatableColumns: GenericDatatableColumnDef<Book>[] = DatatableColumns;

  @Input() items: Book[] = [];
  @Input() isLoading = false;
  @Input() hasError = false;

  @Output() create = new EventEmitter<void>();
  @Output() view = new EventEmitter<Book>();
  @Output() update = new EventEmitter<Book>();
  @Output() delete = new EventEmitter<Book>();
}
