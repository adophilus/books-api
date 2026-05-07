import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { TranslocoService } from "@ngneat/transloco";

import { BaseCreatePageComponent } from "@1hand/pages/base-create-page/base-create-page.component";
import { CreateBookDto, Book, BooksModuleRoot } from "../../books.types";
import { BooksService } from "../../books.service";
import { BooksFormComponent } from "../../components/books-form/books-form.component";

@Component({
  selector: "app-books-create-page",
  standalone: true,
  imports: [BooksFormComponent],
  templateUrl: "./books-create-page.component.html",
})
export class BooksCreatePageComponent extends BaseCreatePageComponent<CreateBookDto, Book> implements OnInit {
  moduleName = BooksModuleRoot;

  constructor(
    protected override service: BooksService,
    protected override dialog: MatDialog,
    protected override transloco: TranslocoService,
    protected override router: Router,
    protected override route: ActivatedRoute
  ) { super(service, dialog, transloco, router, route); }

  protected override onInitParams(): void {}
  protected override buildPayload(formData: any): CreateBookDto {
    return { title: formData.title, description: formData.description || undefined, authorId: formData.authorId };
  }
  protected override getItemLabel(item: Book): string { return item.title; }
}
