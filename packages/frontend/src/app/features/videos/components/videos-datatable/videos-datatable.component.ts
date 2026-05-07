import { Component, EventEmitter, Input, Output } from "@angular/core";
import { GenericDatatableColumnDef, GenericDatatableComponent } from "@1hand/components/generic-datatable/generic-datatable.component";
import { Video } from "../../videos.types";
import { DatatableColumns } from "../../videos.config";

@Component({
  selector: "app-videos-datatable",
  standalone: true,
  imports: [GenericDatatableComponent],
  templateUrl: "./videos-datatable.component.html",
})
export class VideosDatatableComponent {
  datatableColumns: GenericDatatableColumnDef<Video>[] = DatatableColumns;

  @Input() items: Video[] = [];
  @Input() isLoading = false;
  @Input() hasError = false;

  @Output() create = new EventEmitter<void>();
  @Output() view = new EventEmitter<Video>();
  @Output() update = new EventEmitter<Video>();
  @Output() delete = new EventEmitter<Video>();
}
