import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslocoService } from "@ngneat/transloco";
import { Component, OnInit } from "@angular/core";

import { BaseListPageComponent } from "../../../../@1hand/pages/base-list-page/base-list-page.component";
import { AcademicYear as ModuleObject } from "../../academic-years.types";
import { AcademicYearsService as Service } from "@modules/academic-years/academic-years.service";
import { UrlManagerService } from "@modules/core/services/url-manager.service";

@Component({
  selector: "app-academic-years-list-page",
  templateUrl: "./academic-years-list-page.component.html",
  styleUrl: "./academic-years-list-page.component.scss",
})
export class AcademicYearsListPageComponent
  extends BaseListPageComponent<ModuleObject>
  implements OnInit
{
  currentPage = 1;

  moduleName = "academicyears";

  startDate: string = "";
  endDate: string = "";
  contractType: string = "";
  keyword: string = "";

  get schoolId() {
    return this.urlManager.getSchoolIdFromUrl();
  }

  constructor(
    service: Service,
    route: ActivatedRoute,
    transloco: TranslocoService,
    router: Router,
    dialog: MatDialog,
    private urlManager: UrlManagerService
  ) {
    super(service, route, router, transloco);
  }

  protected onParamsInit(params: any): void {
    // init des paramètres custom (keyword, date, etc.)
  }

  protected getListParams(): any {
    return {
      page: this.page,
      limit: this.limit,
      schoolId: this.schoolId,
      // autres filtres si besoin
    };
  }

  protected getItemId(item: ModuleObject): string {
    return item.code;
  }

  protected getItemLabel(item: ModuleObject): string {
    return item.year;
  }

  protected getDeleteTitle(item: ModuleObject): string {
    return this.transloco.translate(`${this.moduleName}.delete.title`, {
      name: item.year,
    });
  }

  protected getDeleteMessage(item: ModuleObject): string {
    return this.transloco.translate(`${this.moduleName}.delete.message`, {
      name: item.year,
    });
  }

  onSearch(): void {
    this.page = 1;
    this.updateQueryParams();
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.updateQueryParams();
  }

  handleCreate() {
    //
  }

  handleView(item: ModuleObject) {
    this.router.navigate(["../", item.code], { relativeTo: this.route });
  }

  handleUpdate(item: ModuleObject) {
    this.router.navigate(["./../edit", item.code], { relativeTo: this.route });
  }

  handleDelete(item: ModuleObject) {
    //
  }
}
