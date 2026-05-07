import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { TranslocoService } from "@ngneat/transloco";

import { BaseCreatePageComponent } from "@1hand/pages/base-create-page/base-create-page.component";
import { CreateBookCommentDto, BookComment, BookCommentsModuleRoot } from "../../book-comments.types";
import { BookCommentsService } from "../../book-comments.service";
import { BookCommentsFormComponent } from "../../components/book-comments-form/book-comments-form.component";

@Component({
  selector: "app-book-comments-create-page",
  standalone: true,
  imports: [BookCommentsFormComponent],
  templateUrl: "./book-comments-create-page.component.html",
})
export class BookCommentsCreatePageComponent extends BaseCreatePageComponent<CreateBookCommentDto, BookComment> implements OnInit {
  moduleName = BookCommentsModuleRoot;

  constructor(
    protected override service: BookCommentsService,
    protected override dialog: MatDialog,
    protected override transloco: TranslocoService,
    protected override router: Router,
    protected override route: ActivatedRoute
  ) { super(service, dialog, transloco, router, route); }

  protected override onInitParams(): void {}
  protected override buildPayload(formData: any): CreateBookCommentDto {
    return { bookId: formData.bookId, authorId: formData.authorId, content: formData.content };
  }
  protected override getItemLabel(item: BookComment): string { return item.content?.substring(0, 30) || item.id; }
}
