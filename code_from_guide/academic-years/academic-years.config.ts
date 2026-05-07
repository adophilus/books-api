import { GenericDatatableColumnDef } from "../../@1hand/components/generic-datatable/generic-datatable.component";
import { AcademicYear as ModuleObject } from "./academic-years.types";

export const DatatableColumns: GenericDatatableColumnDef<ModuleObject>[] = [
  {
    key: "year",
    label: "Année académique",
  },
  {
    key: "startDate",
    label: "Date de début",
    renderValue: (item) =>
      item.startDate ? new Date(item.startDate).toLocaleDateString() : "—",
  },
  {
    key: "endDate",
    label: "Date de fin",
    renderValue: (item) =>
      item.endDate ? new Date(item.endDate).toLocaleDateString() : "—",
  },
  {
    key: "isCurrent",
    label: "Année en cours",
    renderValue: (item) => (item.isCurrent ? "Oui" : "Non"),
  },
  {
    key: "createdAt",
    label: "Créée le",
    renderValue: (item) =>
      item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "—",
  },
  {
    label: "Actions",
    align: "center",
    canView: true,
    canEdit: false,
    canDelete: true,
  },
];
