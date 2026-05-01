import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { VideoViewService } from "./video-view.service";
import { CreateVideoViewDto } from "./dto/create-video-view.dto";

@Controller()
export class VideoViewController {
	constructor(private readonly videoViewService: VideoViewService) {}

	@Post("videos/:videoId/views")
	create(
		@Param("videoId") videoId: number,
		@Body() createVideoViewDto: CreateVideoViewDto,
	) {
		return this.videoViewService.create(videoId, createVideoViewDto);
	}

	@Get("videos/:videoId/views")
	findByVideo(@Param("videoId") videoId: number) {
		return this.videoViewService.findByVideo(videoId);
	}

	@Delete("video-views/:id")
	remove(@Param("id") id: number) {
		return this.videoViewService.remove(id);
	}
}
