import { GenericDatatableColumnDef } from "@1hand/components/generic-datatable/generic-datatable.component";
import { Author } from "./authors.types";

export const DatatableColumns: GenericDatatableColumnDef<Author>[] = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  {
    key: "createdAt",
    label: "Created",
    renderValue: (item) =>
      item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "—",
  },
  {
    label: "Actions",
    align: "center",
    canView: true,
    canEdit: true,
    canDelete: true,
  },
];
