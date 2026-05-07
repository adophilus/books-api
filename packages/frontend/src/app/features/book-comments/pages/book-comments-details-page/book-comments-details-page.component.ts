import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { BookCommentsService } from "../../book-comments.service";
import { BookComment } from "../../book-comments.types";

@Component({
  selector: "app-book-comments-details-page",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./book-comments-details-page.component.html",
})
export class BookCommentsDetailsPageComponent implements OnInit {
  comment: BookComment | null = null;
  isLoading = false;
  hasError = false;

  constructor(private route: ActivatedRoute, private router: Router, private service: BookCommentsService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (!id) { this.hasError = true; return; }
    this.isLoading = true;
    this.service.selectById(id).subscribe({
      next: (c) => { this.comment = c; this.isLoading = false; },
      error: () => { this.hasError = true; this.isLoading = false; },
    });
  }

  onEdit(): void { this.router.navigate(["./update"], { relativeTo: this.route }); }
  onBack(): void { this.router.navigate(["../"], { relativeTo: this.route }); }
}
