import { Component, EventEmitter, Input, Output } from "@angular/core";
import { GenericDatatableColumnDef, GenericDatatableComponent } from "@1hand/components/generic-datatable/generic-datatable.component";
import { VideoComment } from "../../video-comments.types";
import { DatatableColumns } from "../../video-comments.config";

@Component({
  selector: "app-video-comments-datatable",
  standalone: true,
  imports: [GenericDatatableComponent],
  templateUrl: "./video-comments-datatable.component.html",
})
export class VideoCommentsDatatableComponent {
  datatableColumns: GenericDatatableColumnDef<VideoComment>[] = DatatableColumns;

  @Input() items: VideoComment[] = [];
  @Input() isLoading = false;
  @Input() hasError = false;

  @Output() create = new EventEmitter<void>();
  @Output() view = new EventEmitter<VideoComment>();
  @Output() update = new EventEmitter<VideoComment>();
  @Output() delete = new EventEmitter<VideoComment>();
}
