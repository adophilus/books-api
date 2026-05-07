import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { VideoViewsService } from "../../video-views.service";
import { VideoView } from "../../video-views.types";

@Component({
  selector: "app-video-views-update-page",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./video-views-update-page.component.html",
})
export class VideoViewsUpdatePageComponent implements OnInit {
  item: VideoView | null = null;
  isLoading = false;
  hasError = false;

  constructor(private route: ActivatedRoute, private router: Router, private service: VideoViewsService) {}

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
