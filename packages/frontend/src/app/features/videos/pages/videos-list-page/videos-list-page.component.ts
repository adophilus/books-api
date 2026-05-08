import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

import { Video, FilterVideoDto } from "../../videos.types";
import { VideosService } from "../../videos.service";
import { VideosDatatableComponent } from "../../components/videos-datatable/videos-datatable.component";
import { GenericPaginatorComponent } from "@1hand/components/generic-paginator/generic-paginator.component";
import { GenericErrorComponent } from "@1hand/components/generic-error/generic-error.component";

@Component({
  selector: "app-videos-list-page",
  standalone: true,
  imports: [
    CommonModule,
    VideosDatatableComponent,
    GenericPaginatorComponent,
    GenericErrorComponent,
  ],
  templateUrl: "./videos-list-page.component.html",
})
export class VideosListPageComponent implements OnInit {
  items: Video[] = [];
  total = 0;
  loading = false;
  error?: unknown;

  filter: FilterVideoDto = {
    page: 1,
    limit: 10,
  };

  constructor(
    private readonly videosService: VideosService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.loading = true;
    this.error = undefined;

    this.videosService.selectMany(this.filter).subscribe({
      next: (response) => {
        this.items = response.data;
        this.total = response.total;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  goToCreate(): void {
    this.router.navigate(["/videos", "create"]);
  }

  goToDetails(video: Video): void {
    this.router.navigate(["/videos", video.id]);
  }

  goToUpdate(video: Video): void {
    this.router.navigate(["/videos", video.id, "update"]);
  }

  onPageChange(event: { page: number; limit: number }): void {
    this.filter = { ...this.filter, ...event };
    this.loadItems();
  }

  get totalPages(): number {
    return Math.ceil(this.total / (this.filter.limit || 10));
  }

  askDelete(video: Video): void {
    this.videosService.delete(video.id).subscribe(() => this.loadItems());
  }
}
