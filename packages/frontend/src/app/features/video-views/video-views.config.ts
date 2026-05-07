import { GenericDatatableColumnDef } from "@1hand/components/generic-datatable/generic-datatable.component";
import { VideoView } from "./video-views.types";

export const DatatableColumns: GenericDatatableColumnDef<VideoView>[] = [
  { key: "videoId", label: "Video", renderValue: () => "—" },
  { key: "authorId", label: "Viewer", renderValue: () => "—" },
  { key: "createdAt", label: "Viewed", renderValue: (item) => item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "—" },
  { label: "Actions", align: "center", canView: true, canDelete: true },
];
