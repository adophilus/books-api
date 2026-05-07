import { GenericDatatableColumnDef } from "@1hand/components/generic-datatable/generic-datatable.component";
import { BookComment } from "./book-comments.types";

export const DatatableColumns: GenericDatatableColumnDef<BookComment>[] = [
  { key: "bookId", label: "Book", renderValue: () => "—" },
  { key: "authorId", label: "Author", renderValue: () => "—" },
  { key: "content", label: "Content", renderValue: (item) => item.content ? item.content.substring(0, 50) + (item.content.length > 50 ? "..." : "") : "—" },
  { key: "createdAt", label: "Created", renderValue: (item) => item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "—" },
  { label: "Actions", align: "center", canView: true, canEdit: true, canDelete: true },
];
