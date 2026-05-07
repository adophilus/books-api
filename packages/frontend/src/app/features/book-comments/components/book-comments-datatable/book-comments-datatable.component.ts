import { Component, EventEmitter, Input, Output } from "@angular/core";
import { GenericDatatableColumnDef, GenericDatatableComponent } from "@1hand/components/generic-datatable/generic-datatable.component";
import { BookComment } from "../../book-comments.types";
import { DatatableColumns } from "../../book-comments.config";

@Component({
  selector: "app-book-comments-datatable",
  standalone: true,
  imports: [GenericDatatableComponent],
  templateUrl: "./book-comments-datatable.component.html",
})
export class BookCommentsDatatableComponent {
  datatableColumns: GenericDatatableColumnDef<BookComment>[] = DatatableColumns;

  @Input() items: BookComment[] = [];
  @Input() isLoading = false;
  @Input() hasError = false;

  @Output() create = new EventEmitter<void>();
  @Output() view = new EventEmitter<BookComment>();
  @Output() update = new EventEmitter<BookComment>();
  @Output() delete = new EventEmitter<BookComment>();
}
