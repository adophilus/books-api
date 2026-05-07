import { CommonModule, NgComponentOutlet } from "@angular/common";
import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  TemplateRef,
  Type,
} from "@angular/core";
import { GenericDatatableCellComponent } from "./generic-datatable-cell/generic-datatable-cell.component";

export interface GenericDatatableColumnDef<T = any> {
  key?: keyof T; // clé utilisée pour l'affichage direct
  label: string; // nom de la colonne
  align?: "left" | "center"; // alignement du contenu
  width?: string; // largeur CSS ex: '150px', '20%'
  render?: Type<any>; // composant Angular dynamique
  renderValue?: (item: T) => string; // composant Angular dynamique
  template?: TemplateRef<any>; // TemplateRef personnalisé
  renderList?: (row: T) => string[]; // fonction pour afficher une liste
  inputs?: (row: T) => Record<string, any>; // 👈 Ajouté
  canEdit?: boolean;
  canView?: boolean;
  canDelete?: boolean;
}

@Component({
  selector: "app-generic-datatable",
  templateUrl: "./generic-datatable.component.html",
  standalone: true,
  imports: [CommonModule, NgComponentOutlet, GenericDatatableCellComponent],
})
export class GenericDatatableComponent<T = any> implements OnInit {
  @Input() items: T[] = [];
  @Input() columns: GenericDatatableColumnDef<T>[] = [];

  @Input() isLoading = false;
  @Input() hasError = false;

  @Input() emptyIcon = "fas fa-database";
  @Input() emptyTitle = "Aucune donnée trouvée";
  @Input() emptySubtitle = "";

  @Input() showCreateButton = false;
  @Input() createLabel = "Créer";

  @Output() create = new EventEmitter<void>();
  @Output() view = new EventEmitter<T>();
  @Output() update = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();

  constructor(private injector: Injector) {}

  ngOnInit(): void {
    console.log("Datatable: ", this.columns);
  }

  createInjector(column: GenericDatatableColumnDef<T>, item: T): Injector {
    const inputsObj = column.inputs ? column.inputs(item) || {} : {};

    const providers = Object.entries(inputsObj).map(([key, value]) => ({
      provide: key,
      useValue: value,
    }));

    return Injector.create({
      providers,
      parent: this.injector,
    });
  }
}
