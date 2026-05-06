import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { TranslocoService } from "@ngneat/transloco";

import { BaseUpdatePageComponent } from "@1hand/pages/base-update-page/base-update-page.component";
import { UpdateAuthorDto, Author, AuthorsModuleRoot } from "../../authors.types";
import { AuthorsService } from "../../authors.service";
import { AuthorsFormComponent } from "../../components/authors-form/authors-form.component";@Component({
  selector: "app-authors-update-page",
  standalone: true,
  imports: [AuthorsFormComponent],
  templateUrl: "./authors-update-page.component.html",
})
export class AuthorsUpdatePageComponent
  extends BaseUpdatePageComponent<UpdateAuthorDto, Author>
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

  protected getItemIdParamName(): string {
    return "id";
  }

  protected override buildPayload(formData: any): UpdateAuthorDto {
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
