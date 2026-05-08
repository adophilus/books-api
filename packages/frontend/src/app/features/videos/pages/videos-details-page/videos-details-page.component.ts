import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { VideosService } from "../../videos.service";
import { VideoCommentsService } from "../../../video-comments/video-comments.service";
import { VideoViewsService } from "../../../video-views/video-views.service";
import { Video } from "../../videos.types";
import { VideoComment } from "../../../video-comments/video-comments.types";
import { VideoView } from "../../../video-views/video-views.types";
import { GenericDatatableColumnDef } from "@1hand/components/generic-datatable/generic-datatable.component";

@Component({
  selector: "app-videos-details-page",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./videos-details-page.component.html",
})
export class VideosDetailsPageComponent implements OnInit {
  video: Video | null = null;
  loading = false;
  error?: unknown;

  comments: VideoComment[] = [];
  commentsTotal = 0;
  commentsLoading = false;

  views: VideoView[] = [];
  viewsTotal = 0;
  viewsLoading = false;

  commentColumns: GenericDatatableColumnDef<VideoComment>[] = [
    { key: "content", label: "Comment" },
    {
      key: "createdAt",
      label: "Date",
      renderValue: (item) =>
        item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "—",
    },
  ];

  viewColumns: GenericDatatableColumnDef<VideoView>[] = [
    {
      key: "viewedAt",
      label: "Viewed At",
      renderValue: (item) =>
        item.viewedAt ? new Date(item.viewedAt).toLocaleDateString() : "—",
    },
  ];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly videosService: VideosService,
    private readonly commentsService: VideoCommentsService,
    private readonly viewsService: VideoViewsService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (!id) {
      this.error = "Video ID not found";
      return;
    }

    this.loading = true;
    this.videosService.selectById(id).subscribe({
      next: (video) => {
        this.video = video;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = err;
        this.loading = false;
        this.cdr.detectChanges();
      },
    });

    this.loadComments(id);
    this.loadViews(id);
  }

  loadComments(videoId: string): void {
    this.commentsLoading = true;
    this.commentsService.selectMany({ videoId, page: 1, limit: 10 }).subscribe({
      next: (res) => {
        this.comments = res.data;
        this.commentsTotal = res.total;
        this.commentsLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.commentsLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  loadViews(videoId: string): void {
    this.viewsLoading = true;
    this.viewsService.selectMany({ videoId, page: 1, limit: 10 }).subscribe({
      next: (res) => {
        this.views = res.data;
        this.viewsTotal = res.total;
        this.viewsLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.viewsLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  onEdit(): void {
    this.router.navigate(["./update"], { relativeTo: this.route });
  }

  onBack(): void {
    this.router.navigate(["../"], { relativeTo: this.route });
  }
}
