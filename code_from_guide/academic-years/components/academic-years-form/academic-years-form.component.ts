import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Validators } from "@angular/forms";
import { AcademicLevel } from "@modules/academic-levels/academic-levels.types";
import { PhoneNumber } from "../../../auth/auth.types";
import { School } from "@modules/schools/schools.types";
import { Media } from "../../../../@1hand/base.type";
import { FieldConfig } from "../../../../@1hand/components/generic-form/generic-form.component";
import {
  AcademicYear as ModuleObjectDto,
  AcademicYearFormData as ModuleFormData,
} from "@modules/academic-years/academic-years.types";

@Component({
  selector: "app-academic-years-form",
  templateUrl: "./academic-years-form.component.html",
  styleUrl: "./academic-years-form.component.scss",
})
export class AcademicYearsFormComponent {
  @Input() isLoading = false;
  @Input() defaultValues?: Partial<ModuleObjectDto> = {};
  @Input() schools: School[] = [];
  @Input() academicLevels: AcademicLevel[] = [];
  @Input() phoneNumbers: PhoneNumber[] = [];
  @Input() medias: Media[] = [];

  @Output() onSubmit = new EventEmitter<ModuleFormData>();

  genericFormConfig: FieldConfig[] = [];

  ngOnInit(): void {
    this.genericFormConfig = [
      {
        name: "year",
        label: "academicYearForm.year",
        placeholder: "academicYearForm.year",
        type: "string",
        required: true,
        size: { xs: 12 },
        validation: [Validators.required],
        errorMessages: {
          required: "formErrors.academicYearForm.year.required",
        },
      },
      {
        name: "startDate",
        label: "academicYearForm.startDate",
        placeholder: "academicYearForm.startDate",
        type: "date",
        required: true,
        size: { xs: 12, md: 6 },
        validation: [Validators.required],
        errorMessages: {
          required: "formErrors.academicYearForm.startDate.required",
        },
      },
      {
        name: "endDate",
        label: "academicYearForm.endDate",
        placeholder: "academicYearForm.endDate",
        type: "date",
        required: true,
        size: { xs: 12, md: 6 },
        validation: [Validators.required],
        errorMessages: {
          required: "formErrors.academicYearForm.endDate.required",
        },
      },
    ];
  }

  handleSubmit(data: ModuleFormData) {
    this.onSubmit.emit(data);
  }
}
