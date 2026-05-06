import {
  Component,
  EventEmitter,
  Injector,
  Input,
  Output,
} from "@angular/core";
import { GenericDatatableColumnDef } from "../generic-datatable.component";
import { CommonModule } from "@angular/common";
import { GenericDatatableActionsCellComponent } from "../generic-datatable-actions-cell/generic-datatable-actions-cell.component";

@Component({
  selector: "app-generic-datatable-cell",
  standalone: true,
  imports: [CommonModule, GenericDatatableActionsCellComponent],
  templateUrl: "./generic-datatable-cell.component.html",
  styleUrl: "./generic-datatable-cell.component.scss",
})
export class GenericDatatableCellComponent<T = any> {
  @Input() item!: T;
  @Input() column!: GenericDatatableColumnDef<T>;
  @Input() injector!: Injector;

  @Output() view = new EventEmitter<T>();
  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();

  createInjector(): Injector {
    const inputsObj = this.column.inputs
      ? this.column.inputs(this.item) || {}
      : {};

    const providers = Object.entries(inputsObj).map(([key, value]) => ({
      provide: key,
      useValue: value,
    }));

    return Injector.create({
      providers,
      parent: this.injector,
    });
  }

  hasAction(): boolean {
    return !!(
      this.column.canEdit ||
      this.column.canView ||
      this.column.canDelete
    );
  }

  handleView(): void {
    this.view.emit(this.item);
  }

  handleEdit(): void {
    this.edit.emit(this.item);
  }

  handleDelete(): void {
    this.delete.emit(this.item);
  }
}
