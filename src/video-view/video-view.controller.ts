import { Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { VideoViewService } from "./video-view.service";
import { AuthGuard } from "../auth/auth.guard";
import { AuthorService } from "../author/author.service";
import type { RequestWithUser } from "../auth/auth.guard";

@Controller()
export class VideoViewController {
	constructor(
		private readonly videoViewService: VideoViewService,
		private readonly authorService: AuthorService,
	) {}

	@UseGuards(AuthGuard)
	@Post("videos/:videoId/views")
	async create(@Param("videoId") videoId: number, @Req() req: RequestWithUser) {
		const author = await this.authorService.findByUserId(req.user.sub);
		return this.videoViewService.create(videoId, author.id);
	}

	@Get("videos/:videoId/views")
	findByVideo(@Param("videoId") videoId: number) {
		return this.videoViewService.findByVideo(videoId);
	}

	@UseGuards(AuthGuard)
	@Delete("video-views/:id")
	async remove(@Param("id") id: number, @Req() req: RequestWithUser) {
		const author = await this.authorService.findByUserId(req.user.sub);
		return this.videoViewService.remove(id, author.id);
	}
}
