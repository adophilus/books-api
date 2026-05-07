import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Validators } from "@angular/forms";
import { FieldConfig, GenericFormComponent } from "@1hand/components/generic-form/generic-form.component";
import { VideoComment } from "../../video-comments.types";

@Component({
  selector: "app-video-comments-form",
  standalone: true,
  imports: [GenericFormComponent],
  templateUrl: "./video-comments-form.component.html",
})
export class VideoCommentsFormComponent {
  @Input() isLoading = false;
  @Input() defaultValues?: Partial<VideoComment> = {};
  @Output() onSubmit = new EventEmitter<any>();

  genericFormConfig: FieldConfig[] = [];

  ngOnInit(): void {
    this.genericFormConfig = [
      {
        name: "videoId",
        label: "videoCommentForm.video",
        placeholder: "videoCommentForm.video",
        type: "string",
        required: true,
        size: { xs: 12, md: 6 },
        validation: [Validators.required],
        errorMessages: { required: "formErrors.videoCommentForm.video.required" },
      },
      {
        name: "authorId",
        label: "videoCommentForm.author",
        placeholder: "videoCommentForm.author",
        type: "string",
        required: true,
        size: { xs: 12, md: 6 },
        validation: [Validators.required],
        errorMessages: { required: "formErrors.videoCommentForm.author.required" },
      },
      {
        name: "content",
        label: "videoCommentForm.content",
        placeholder: "videoCommentForm.content",
        type: "string",
        required: true,
        size: { xs: 12 },
        validation: [Validators.required],
        errorMessages: { required: "formErrors.videoCommentForm.content.required" },
      },
    ];
  }

  handleSubmit(data: any): void {
    this.onSubmit.emit(data);
  }
}
