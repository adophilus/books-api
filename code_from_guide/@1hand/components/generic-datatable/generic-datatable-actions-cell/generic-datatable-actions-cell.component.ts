import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-generic-datatable-actions-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generic-datatable-actions-cell.component.html',
  styleUrl: './generic-datatable-actions-cell.component.scss',
})
export class GenericDatatableActionsCellComponent<T = any> {
  @Input() item!: T;
  @Input() canView?: boolean = false;
  @Input() canEdit?: boolean = false;
  @Input() canDelete?: boolean = false;

  @Output() view = new EventEmitter<T>();
  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();

  onView() {
    this.view.emit(this.item);
  }

  onEdit() {
    this.edit.emit(this.item);
  }

  onDelete() {
    this.delete.emit(this.item);
  }
}
