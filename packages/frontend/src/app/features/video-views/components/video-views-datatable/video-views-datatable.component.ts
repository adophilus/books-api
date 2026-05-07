import { Component, EventEmitter, Input, Output } from "@angular/core";
import { GenericDatatableColumnDef, GenericDatatableComponent } from "@1hand/components/generic-datatable/generic-datatable.component";
import { VideoView } from "../../video-views.types";
import { DatatableColumns } from "../../video-views.config";

@Component({
  selector: "app-video-views-datatable",
  standalone: true,
  imports: [GenericDatatableComponent],
  templateUrl: "./video-views-datatable.component.html",
})
export class VideoViewsDatatableComponent {
  datatableColumns: GenericDatatableColumnDef<VideoView>[] = DatatableColumns;

  @Input() items: VideoView[] = [];
  @Input() isLoading = false;
  @Input() hasError = false;

  @Output() create = new EventEmitter<void>();
  @Output() view = new EventEmitter<VideoView>();
  @Output() delete = new EventEmitter<VideoView>();
}
