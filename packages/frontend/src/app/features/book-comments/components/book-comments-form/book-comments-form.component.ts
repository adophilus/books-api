import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Validators } from "@angular/forms";
import { FieldConfig, GenericFormComponent } from "@1hand/components/generic-form/generic-form.component";
import { BookComment } from "../../book-comments.types";

@Component({
  selector: "app-book-comments-form",
  standalone: true,
  imports: [GenericFormComponent],
  templateUrl: "./book-comments-form.component.html",
})
export class BookCommentsFormComponent {
  @Input() isLoading = false;
  @Input() defaultValues?: Partial<BookComment> = {};
  @Output() onSubmit = new EventEmitter<any>();

  genericFormConfig: FieldConfig[] = [];

  ngOnInit(): void {
    this.genericFormConfig = [
      {
        name: "bookId",
        label: "bookCommentForm.book",
        placeholder: "bookCommentForm.book",
        type: "string",
        required: true,
        size: { xs: 12, md: 6 },
        validation: [Validators.required],
        errorMessages: { required: "formErrors.bookCommentForm.book.required" },
      },
      {
        name: "authorId",
        label: "bookCommentForm.author",
        placeholder: "bookCommentForm.author",
        type: "string",
        required: true,
        size: { xs: 12, md: 6 },
        validation: [Validators.required],
        errorMessages: { required: "formErrors.bookCommentForm.author.required" },
      },
      {
        name: "content",
        label: "bookCommentForm.content",
        placeholder: "bookCommentForm.content",
        type: "string",
        required: true,
        size: { xs: 12 },
        validation: [Validators.required],
        errorMessages: { required: "formErrors.bookCommentForm.content.required" },
      },
    ];
  }

  handleSubmit(data: any): void {
    this.onSubmit.emit(data);
  }
}
