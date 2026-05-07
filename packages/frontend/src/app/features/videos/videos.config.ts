import { GenericDatatableColumnDef } from "@1hand/components/generic-datatable/generic-datatable.component";
import { Video } from "./videos.types";

export const DatatableColumns: GenericDatatableColumnDef<Video>[] = [
  { key: "title", label: "Title" },
  { key: "url", label: "URL", renderValue: (item) => item.url ? item.url.substring(0, 40) + "..." : "—" },
  { key: "authorId", label: "Author", renderValue: () => "—" },
  { key: "createdAt", label: "Created", renderValue: (item) => item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "—" },
  { label: "Actions", align: "center", canView: true, canEdit: true, canDelete: true },
];
