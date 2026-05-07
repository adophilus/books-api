import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { BooksService } from "../../books.service";
import { Book } from "../../books.types";

@Component({
  selector: "app-books-details-page",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./books-details-page.component.html",
})
export class BooksDetailsPageComponent implements OnInit {
  book: Book | null = null;
  isLoading = false;
  hasError = false;
  errorMessage = "";

  constructor(private route: ActivatedRoute, private router: Router, private bookService: BooksService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (!id) { this.hasError = true; this.errorMessage = "Book ID not found"; return; }
    this.isLoading = true;
    this.bookService.selectById(id).subscribe({
      next: (b) => { this.book = b; this.isLoading = false; },
      error: () => { this.hasError = true; this.errorMessage = "Error loading book"; this.isLoading = false; },
    });
  }

  onEdit(): void { this.router.navigate(["./update"], { relativeTo: this.route }); }
  onBack(): void { this.router.navigate(["../"], { relativeTo: this.route }); }
}
