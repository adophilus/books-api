import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { TranslocoService } from "@ngneat/transloco";

import { BaseUpdatePageComponent } from "@1hand/pages/base-update-page/base-update-page.component";
import { UpdateBookCommentDto, BookComment, BookCommentsModuleRoot } from "../../book-comments.types";
import { BookCommentsService } from "../../book-comments.service";
import { BookCommentsFormComponent } from "../../components/book-comments-form/book-comments-form.component";

@Component({
  selector: "app-book-comments-update-page",
  standalone: true,
  imports: [BookCommentsFormComponent],
  templateUrl: "./book-comments-update-page.component.html",
})
export class BookCommentsUpdatePageComponent extends BaseUpdatePageComponent<UpdateBookCommentDto, BookComment> implements OnInit {
  moduleName = BookCommentsModuleRoot;

  constructor(
    protected override service: BookCommentsService,
    protected override dialog: MatDialog,
    protected override transloco: TranslocoService,
    protected override router: Router,
    protected override route: ActivatedRoute
  ) { super(service, dialog, transloco, router, route); }

  protected getItemIdParamName(): string { return "id"; }
  protected override buildPayload(formData: any): UpdateBookCommentDto {
    return { content: formData.content };
  }
  protected override getItemLabel(item: BookComment): string { return item.content?.substring(0, 30) || item.id; }
}
