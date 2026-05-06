import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { AuthorsService } from "../../authors.service";
import { Author } from "../../authors.types";
import { BookService } from "../../../../core/services/book.service";
import { VideoService } from "../../../../core/services/video.service";
import { Book } from "../../../../core/models/book.model";
import { Video } from "../../../../core/models/video.model";

@Component({
  selector: "app-authors-details-page",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./authors-details-page.component.html",
})
export class AuthorsDetailsPageComponent implements OnInit {
  author: Author | null = null;
  books: Book[] = [];
  videos: Video[] = [];
  isLoading = false;
  hasError = false;
  errorMessage = "";
  activeTab: "books" | "videos" = "books";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authorService: AuthorsService,
    private bookService: BookService,
    private videoService: VideoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (!id) {
      this.hasError = true;
      this.errorMessage = "Author ID not found";
      return;
    }
    this.isLoading = true;
    this.authorService.selectById(id).subscribe({
      next: (a) => {
        this.author = a;
        this.loadContent(a.id);
      },
      error: () => {
        this.hasError = true;
        this.errorMessage = "Error loading author";
        this.isLoading = false;
      },
    });
  }

  private loadContent(authorId: string) {
    this.bookService.selectMany({ authorId, limit: 100 }).subscribe({
      next: (res) => (this.books = res.data),
    });
    this.videoService.selectMany({ authorId, limit: 100 }).subscribe({
      next: (res) => {
        this.videos = res.data;
        this.isLoading = false;
      },
      error: () => (this.isLoading = false),
    });
  }

  onEdit(): void {
    this.router.navigate(["./update"], { relativeTo: this.route });
  }

  onBack(): void {
    this.router.navigate(["../"], { relativeTo: this.route });
  }
}
