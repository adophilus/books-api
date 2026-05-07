import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { TranslocoService } from "@ngneat/transloco";

import { BaseUpdatePageComponent } from "@1hand/pages/base-update-page/base-update-page.component";
import { UpdateBookDto, Book, BooksModuleRoot } from "../../books.types";
import { BooksService } from "../../books.service";
import { BooksFormComponent } from "../../components/books-form/books-form.component";

@Component({
  selector: "app-books-update-page",
  standalone: true,
  imports: [BooksFormComponent],
  templateUrl: "./books-update-page.component.html",
})
export class BooksUpdatePageComponent extends BaseUpdatePageComponent<UpdateBookDto, Book> implements OnInit {
  moduleName = BooksModuleRoot;

  constructor(
    protected override service: BooksService,
    protected override dialog: MatDialog,
    protected override transloco: TranslocoService,
    protected override router: Router,
    protected override route: ActivatedRoute
  ) { super(service, dialog, transloco, router, route); }

  protected getItemIdParamName(): string { return "id"; }
  protected override buildPayload(formData: any): UpdateBookDto {
    return { title: formData.title, description: formData.description || undefined };
  }
  protected override getItemLabel(item: Book): string { return item.title; }
}
