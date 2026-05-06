import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { TranslocoService } from "@ngneat/transloco";

import { BaseCreatePageComponent } from "@1hand/pages/base-create-page/base-create-page.component";
import {
  CreateAuthorDto,
  Author,
  AuthorsModuleRoot,
} from "../../authors.types";
import { AuthorsService } from "../../authors.service";
import { AuthorsFormComponent } from "../../components/authors-form/authors-form.component";@Component({
  selector: "app-authors-create-page",
  standalone: true,
  imports: [AuthorsFormComponent],
  templateUrl: "./authors-create-page.component.html",
})
export class AuthorsCreatePageComponent
  extends BaseCreatePageComponent<CreateAuthorDto, Author>
  implements OnInit
{
  moduleName = AuthorsModuleRoot;

  constructor(
    protected override service: AuthorsService,
    protected override dialog: MatDialog,
    protected override transloco: TranslocoService,
    protected override router: Router,
    protected override route: ActivatedRoute
  ) {
    super(service, dialog, transloco, router, route);
  }

  protected override onInitParams(): void {}

  protected override buildPayload(formData: any): CreateAuthorDto {
    return {
      name: formData.name,
      email: formData.email,
      bio: formData.bio || undefined,
    };
  }

  protected override getItemLabel(item: Author): string {
    return item.name;
  }
}
