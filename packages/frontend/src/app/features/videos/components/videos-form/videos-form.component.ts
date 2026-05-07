import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Validators } from "@angular/forms";
import { FieldConfig, GenericFormComponent } from "@1hand/components/generic-form/generic-form.component";
import { Video } from "../../videos.types";

@Component({
  selector: "app-videos-form",
  standalone: true,
  imports: [GenericFormComponent],
  templateUrl: "./videos-form.component.html",
})
export class VideosFormComponent {
  @Input() isLoading = false;
  @Input() defaultValues?: Partial<Video> = {};
  @Output() onSubmit = new EventEmitter<any>();

  genericFormConfig: FieldConfig[] = [];

  ngOnInit(): void {
    this.genericFormConfig = [
      {
        name: "title",
        label: "videoForm.title",
        placeholder: "videoForm.title",
        type: "string",
        required: true,
        size: { xs: 12, md: 6 },
        validation: [Validators.required],
        errorMessages: { required: "formErrors.videoForm.title.required" },
      },
      {
        name: "url",
        label: "videoForm.url",
        placeholder: "videoForm.url",
        type: "string",
        required: true,
        size: { xs: 12, md: 6 },
        validation: [Validators.required],
        errorMessages: { required: "formErrors.videoForm.url.required" },
      },
      {
        name: "authorId",
        label: "videoForm.author",
        placeholder: "videoForm.author",
        type: "string",
        required: true,
        size: { xs: 12, md: 6 },
        validation: [Validators.required],
        errorMessages: { required: "formErrors.videoForm.author.required" },
      },
      {
        name: "description",
        label: "videoForm.description",
        placeholder: "videoForm.description",
        type: "string",
        size: { xs: 12, md: 6 },
      },
    ];
  }

  handleSubmit(data: any): void {
    this.onSubmit.emit(data);
  }
}
