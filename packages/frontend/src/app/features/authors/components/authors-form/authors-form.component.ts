import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Validators } from "@angular/forms";
import { FieldConfig, GenericFormComponent } from "@1hand/components/generic-form/generic-form.component";
import { Author } from "../../authors.types";

@Component({
  selector: "app-authors-form",
  standalone: true,
  imports: [GenericFormComponent],
  templateUrl: "./authors-form.component.html",
})
export class AuthorsFormComponent {
  @Input() isLoading = false;
  @Input() defaultValues?: Partial<Author> = {};
  @Output() onSubmit = new EventEmitter<any>();

  genericFormConfig: FieldConfig[] = [];

  ngOnInit(): void {
    this.genericFormConfig = [
      {
        name: "name",
        label: "authorForm.name",
        placeholder: "authorForm.name",
        type: "string",
        required: true,
        size: { xs: 12, md: 6 },
        validation: [Validators.required],
        errorMessages: {
          required: "formErrors.authorForm.name.required",
        },
      },
      {
        name: "email",
        label: "authorForm.email",
        placeholder: "authorForm.email",
        type: "email",
        required: true,
        size: { xs: 12, md: 6 },
        validation: [Validators.required, Validators.email],
        errorMessages: {
          required: "formErrors.authorForm.email.required",
          email: "formErrors.authorForm.email.email",
        },
      },
      {
        name: "bio",
        label: "authorForm.bio",
        placeholder: "authorForm.bio",
        type: "string",
        size: { xs: 12 },
      },
    ];
  }

  handleSubmit(data: any): void {
    this.onSubmit.emit(data);
  }
}
