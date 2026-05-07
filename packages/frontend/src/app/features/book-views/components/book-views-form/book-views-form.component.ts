import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Validators } from "@angular/forms";
import { FieldConfig, GenericFormComponent } from "@1hand/components/generic-form/generic-form.component";
import { BookView } from "../../book-views.types";

@Component({
  selector: "app-book-views-form",
  standalone: true,
  imports: [GenericFormComponent],
  templateUrl: "./book-views-form.component.html",
})
export class BookViewsFormComponent {
  @Input() isLoading = false;
  @Input() defaultValues?: Partial<BookView> = {};
  @Output() onSubmit = new EventEmitter<any>();

  genericFormConfig: FieldConfig[] = [];

  ngOnInit(): void {
    this.genericFormConfig = [
      {
        name: "bookId",
        label: "bookViewForm.book",
        placeholder: "bookViewForm.book",
        type: "string",
        required: true,
        size: { xs: 12, md: 6 },
        validation: [Validators.required],
        errorMessages: { required: "formErrors.bookViewForm.book.required" },
      },
      {
        name: "authorId",
        label: "bookViewForm.author",
        placeholder: "bookViewForm.author",
        type: "string",
        required: true,
        size: { xs: 12, md: 6 },
        validation: [Validators.required],
        errorMessages: { required: "formErrors.bookViewForm.author.required" },
      },
    ];
  }

  handleSubmit(data: any): void {
    this.onSubmit.emit(data);
  }
}
