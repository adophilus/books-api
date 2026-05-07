import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { TranslocoService } from "@ngneat/transloco";

import { BaseCreatePageComponent } from "@1hand/pages/base-create-page/base-create-page.component";
import { CreateBookViewDto, BookView, BookViewsModuleRoot } from "../../book-views.types";
import { BookViewsService } from "../../book-views.service";
import { BookViewsFormComponent } from "../../components/book-views-form/book-views-form.component";

@Component({
  selector: "app-book-views-create-page",
  standalone: true,
  imports: [BookViewsFormComponent],
  templateUrl: "./book-views-create-page.component.html",
})
export class BookViewsCreatePageComponent extends BaseCreatePageComponent<CreateBookViewDto, BookView> implements OnInit {
  moduleName = BookViewsModuleRoot;

  constructor(
    protected override service: BookViewsService,
    protected override dialog: MatDialog,
    protected override transloco: TranslocoService,
    protected override router: Router,
    protected override route: ActivatedRoute
  ) { super(service, dialog, transloco, router, route); }

  protected override onInitParams(): void {}
  protected override buildPayload(formData: any): CreateBookViewDto {
    return { bookId: formData.bookId, authorId: formData.authorId };
  }
  protected override getItemLabel(item: BookView): string { return item.id; }
}
