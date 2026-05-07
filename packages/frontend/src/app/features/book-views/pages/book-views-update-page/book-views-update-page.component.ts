import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { BookViewsService } from "../../book-views.service";
import { BookView } from "../../book-views.types";

@Component({
  selector: "app-book-views-update-page",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./book-views-update-page.component.html",
})
export class BookViewsUpdatePageComponent implements OnInit {
  item: BookView | null = null;
  isLoading = false;
  hasError = false;

  constructor(private route: ActivatedRoute, private router: Router, private service: BookViewsService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (!id) { this.hasError = true; return; }
    this.isLoading = true;
    this.service.selectById(id).subscribe({
      next: (v) => { this.item = v; this.isLoading = false; },
      error: () => { this.hasError = true; this.isLoading = false; },
    });
  }

  onBack(): void { this.router.navigate(["../"], { relativeTo: this.route }); }
}
