import { Component, EventEmitter, Input, Output } from "@angular/core";
import { GenericDatatableColumnDef, GenericDatatableComponent } from "@1hand/components/generic-datatable/generic-datatable.component";
import { BookView } from "../../book-views.types";
import { DatatableColumns } from "../../book-views.config";

@Component({
  selector: "app-book-views-datatable",
  standalone: true,
  imports: [GenericDatatableComponent],
  templateUrl: "./book-views-datatable.component.html",
})
export class BookViewsDatatableComponent {
  datatableColumns: GenericDatatableColumnDef<BookView>[] = DatatableColumns;

  @Input() items: BookView[] = [];
  @Input() isLoading = false;
  @Input() hasError = false;

  @Output() create = new EventEmitter<void>();
  @Output() view = new EventEmitter<BookView>();
  @Output() delete = new EventEmitter<BookView>();
}
