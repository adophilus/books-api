import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Validators } from "@angular/forms";
import { FieldConfig, GenericFormComponent } from "@1hand/components/generic-form/generic-form.component";
import { VideoView } from "../../video-views.types";

@Component({
  selector: "app-video-views-form",
  standalone: true,
  imports: [GenericFormComponent],
  templateUrl: "./video-views-form.component.html",
})
export class VideoViewsFormComponent {
  @Input() isLoading = false;
  @Input() defaultValues?: Partial<VideoView> = {};
  @Output() onSubmit = new EventEmitter<any>();

  genericFormConfig: FieldConfig[] = [];

  ngOnInit(): void {
    this.genericFormConfig = [
      {
        name: "videoId",
        label: "videoViewForm.video",
        placeholder: "videoViewForm.video",
        type: "string",
        required: true,
        size: { xs: 12, md: 6 },
        validation: [Validators.required],
        errorMessages: { required: "formErrors.videoViewForm.video.required" },
      },
      {
        name: "authorId",
        label: "videoViewForm.author",
        placeholder: "videoViewForm.author",
        type: "string",
        required: true,
        size: { xs: 12, md: 6 },
        validation: [Validators.required],
        errorMessages: { required: "formErrors.videoViewForm.author.required" },
      },
    ];
  }

  handleSubmit(data: any): void {
    this.onSubmit.emit(data);
  }
}
