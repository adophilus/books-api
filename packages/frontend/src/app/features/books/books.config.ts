import { GenericDatatableColumnDef } from "@1hand/components/generic-datatable/generic-datatable.component";
import { Book } from "./books.types";

export const DatatableColumns: GenericDatatableColumnDef<Book>[] = [
  { key: "title", label: "Title" },
  { key: "authorId", label: "Author", renderValue: () => "—" },
  { key: "createdAt", label: "Created", renderValue: (item) => item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "—" },
  { label: "Actions", align: "center", canView: true, canEdit: true, canDelete: true },
];
