import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { VideosService } from "../../videos.service";
import { Video } from "../../videos.types";

@Component({
  selector: "app-videos-details-page",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./videos-details-page.component.html",
})
export class VideosDetailsPageComponent implements OnInit {
  video: Video | null = null;
  isLoading = false;
  hasError = false;
  errorMessage = "";

  constructor(private route: ActivatedRoute, private router: Router, private videoService: VideosService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (!id) { this.hasError = true; this.errorMessage = "Video ID not found"; return; }
    this.isLoading = true;
    this.videoService.selectById(id).subscribe({
      next: (v) => { this.video = v; this.isLoading = false; },
      error: () => { this.hasError = true; this.errorMessage = "Error loading video"; this.isLoading = false; },
    });
  }

  onEdit(): void { this.router.navigate(["./update"], { relativeTo: this.route }); }
  onBack(): void { this.router.navigate(["../"], { relativeTo: this.route }); }
}
