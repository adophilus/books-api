import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { GenericAutoCompleteComponent } from "../generic-autocomplete/generic-autocomplete.component";
import { TranslocoModule } from "@ngneat/transloco";
import { GenericTextEditorComponent } from "../generic-text-editor/generic-text-editor.component";
import {
  CountryISO,
  NgxIntlTelInputModule,
  SearchCountryField,
} from "ngx-intl-tel-input";

export interface FieldConfig {
  name: string;
  label: string;
  type?: FieldType;
  options?: any[];
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  multiple?: boolean;
  acceptedFileExtensions?: string[];
  fieldset?: string;
  disabled?: boolean;
  defaultValue?: any;
  dynamicConfig?: (
    formValues: any
  ) => Partial<Omit<FieldConfig, "dynamicConfig">>;
  validation?: any[];
  errorMessages?: { [key: string]: string };
  order?: number;
  size?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  displayFn?: (item: any) => string;
  editorOptions?: {
    minHeight?: number; // ex: 220
    readOnly?: boolean; // ex: false
    toolbarSticky?: boolean; // ex: true (pour ajouter 'sticky top-0')
  };
}

type FieldType =
  | "string"
  | "password"
  | "number"
  | "select"
  | "autocomplete"
  | "date"
  | "datetime"
  | "file"
  | "richtext"
  | "email"
  | "phone";

@Component({
  selector: "app-generic-form",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoModule,
    GenericAutoCompleteComponent,
    GenericTextEditorComponent,
    NgxIntlTelInputModule,
  ],
  templateUrl: "./generic-form.component.html",
  styleUrls: ["./generic-form.component.scss"],
})
export class GenericFormComponent implements OnInit, OnChanges {
  @Input() fieldConfigurations: FieldConfig[] = [];
  @Input() defaultValues: any = {};
  @Input() errorMessage?: string;
  @Input() transationNamespace?: string;
  @Input() isLoading = false;
  @Input() showActionButton = true;
  @Output() submitForm = new EventEmitter<any>();

  CountryISO = CountryISO;
  SearchCountryField = SearchCountryField;

  form!: FormGroup;
  fieldsets: Record<string, FieldConfig[]> = {};
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["defaultValues"] && !changes["defaultValues"].firstChange) {
      this.patchDefaultValues();
    }
  }

  initializeForm() {
    const group: Record<string, FormControl> = {};
    this.fieldsets = {};

    this.fieldConfigurations.forEach((field) => {
      const dynamicConfig = field.dynamicConfig
        ? field.dynamicConfig(this.defaultValues)
        : {};
      const mergedField = { ...field, ...dynamicConfig };

      const validators = mergedField.validation || [];
      if (mergedField.required) {
        validators.push(Validators.required);
      }

      // const defaultValue =
      //   this.defaultValues[mergedField.name] ?? mergedField.defaultValue ?? "";

      const defaultValue =
        this.defaultValues?.[mergedField.name] ??
        mergedField.defaultValue ??
        "";

      group[mergedField.name] = new FormControl(
        { value: defaultValue, disabled: mergedField.disabled },
        validators
      );

      const key = mergedField.fieldset || "Default";
      if (!this.fieldsets[key]) {
        this.fieldsets[key] = [];
      }
      this.fieldsets[key].push(mergedField);
    });

    this.form = this.fb.group(group);
    this.patchDefaultValues();
  }

  patchDefaultValues(): void {
    if (!this.form || !this.defaultValues) return;

    Object.entries(this.defaultValues).forEach(([key, value]) => {
      const control = this.form.get(key);
      if (control) {
        control.patchValue(value);
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return !!(
      control &&
      control.invalid &&
      (control.touched || this.submitted)
    );
  }

  submit(): void {
    this.onSubmit();
  }

  onSubmit(): void {
    this.submitted = true;
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }

  getFieldSizeClasses(field: FieldConfig): string {
    const size = field.size || {};
    const xs = size.xs ?? 12;
    const sm = size.sm ?? xs;
    const md = size.md ?? sm;
    const lg = size.lg ?? md;
    const xl = size.xl ?? lg;

    return `col-${xs} col-sm-${sm} col-md-${md} col-lg-${lg} col-xl-${xl}`;
  }

  onFileChange(event: any, field: FieldConfig) {
    const files = event.target.files;
    const control = this.form.get(field.name);
    if (!control) return;

    if (files && field.multiple) {
      control.setValue(Array.from(files));
    } else if (files && files[0]) {
      control.setValue(files[0]);
    }
  }

  getKeys(object: Object): string[] {
    return Object.keys(object);
  }

  getFirstErrorMessage(field: FieldConfig): string {
    const errors = this.form.get(field.name)?.errors;
    if (!errors) return "";

    const firstKey = Object.keys(errors)[0];
    return field.errorMessages?.[firstKey] || "Valeur invalide";
  }

  getFormControl(fieldName: string): FormControl {
    return this.form.get(fieldName) as FormControl;
  }

  defaultDisplayFn = (item: any): string => {
    if (!item) return "";
    if (typeof item === "string") return item;
    if (typeof item === "object") {
      return item.label ?? item.name ?? JSON.stringify(item);
    }
    return String(item);
  };
}
