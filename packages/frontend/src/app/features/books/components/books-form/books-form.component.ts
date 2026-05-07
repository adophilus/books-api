import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Validators } from "@angular/forms";
import { FieldConfig, GenericFormComponent } from "@1hand/components/generic-form/generic-form.component";
import { Book } from "../../books.types";

@Component({
  selector: "app-books-form",
  standalone: true,
  imports: [GenericFormComponent],
  templateUrl: "./books-form.component.html",
})
export class BooksFormComponent {
  @Input() isLoading = false;
  @Input() defaultValues?: Partial<Book> = {};
  @Output() onSubmit = new EventEmitter<any>();

  genericFormConfig: FieldConfig[] = [];

  ngOnInit(): void {
    this.genericFormConfig = [
      {
        name: "title",
        label: "bookForm.title",
        placeholder: "bookForm.title",
        type: "string",
        required: true,
        size: { xs: 12, md: 6 },
        validation: [Validators.required],
        errorMessages: { required: "formErrors.bookForm.title.required" },
      },
      {
        name: "authorId",
        label: "bookForm.author",
        placeholder: "bookForm.author",
        type: "string",
        required: true,
        size: { xs: 12, md: 6 },
        validation: [Validators.required],
        errorMessages: { required: "formErrors.bookForm.author.required" },
      },
      {
        name: "description",
        label: "bookForm.description",
        placeholder: "bookForm.description",
        type: "string",
        size: { xs: 12 },
      },
    ];
  }

  handleSubmit(data: any): void {
    this.onSubmit.emit(data);
  }
}
