import { Component, OnInit } from "@angular/core";
import { BaseCreatePageComponent } from "../../../../@1hand/pages/base-create-page/base-create-page.component";
import { AcademicYearsService as Service } from "@modules/academic-years/academic-years.service";
import {
  CreateAcademicYearDto as ModuleObjectCreateDto,
  AcademicYear as ModuleObject,
  AcademicYearFormData as ModuleObjectFormData,
  AcademicYearsModuleRoot as ModuleRoot,
} from "@modules/academic-years/academic-years.types";
import { MatDialog } from "@angular/material/dialog";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslocoService } from "@ngneat/transloco";
import { UrlManagerService } from "../../../core/services/url-manager.service";

@Component({
  selector: "app-academic-years-create-page",
  templateUrl: "./academic-years-create-page.component.html",
  styleUrl: "./academic-years-create-page.component.scss",
})
export class AcademicYearsCreatePageComponent
  extends BaseCreatePageComponent<ModuleObjectCreateDto, ModuleObject>
  implements OnInit
{
  moduleName = ModuleRoot;
  employerId!: string;

  constructor(
    protected override service: Service,
    protected override dialog: MatDialog,
    protected override transloco: TranslocoService,
    protected override router: Router,
    protected override route: ActivatedRoute,
    private urlManager: UrlManagerService
  ) {
    super(service, dialog, transloco, router, route);
  }

  override onInitParams(): void {
    // this.route.parent?.parent?.paramMap.subscribe((params) => {
    //   const employerId = params.get("employerId");
    //   if (!employerId) {
    //     this.router.navigate(["../"]);
    //     return;
    //   }
    //   this.employerId = employerId;
    // });
  }

  override buildPayload(formData: ModuleObjectFormData): ModuleObjectCreateDto {
    const schoolId = this.urlManager.getSchoolIdFromUrl();

    if (!schoolId) {
      throw new Error("ID de l'école non trouvé dans l'URL");
    }

    return {
      ...formData,
      schoolId,
    };
  }

  override getItemLabel(item: ModuleObject): string {
    return `${item.year}`;
  }
}
