import { GenericDatatableColumnDef } from "@1hand/components/generic-datatable/generic-datatable.component";
import { VideoComment } from "./video-comments.types";

export const DatatableColumns: GenericDatatableColumnDef<VideoComment>[] = [
  { key: "videoId", label: "Video", renderValue: () => "—" },
  { key: "authorId", label: "Author", renderValue: () => "—" },
  { key: "content", label: "Content", renderValue: (item) => item.content ? item.content.substring(0, 50) + (item.content.length > 50 ? "..." : "") : "—" },
  { key: "createdAt", label: "Created", renderValue: (item) => item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "—" },
  { label: "Actions", align: "center", canView: true, canEdit: true, canDelete: true },
];
