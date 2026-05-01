import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Req,
	UseGuards,
} from "@nestjs/common";
import { VideoCommentService } from "./video-comment.service";
import {
	CreateVideoCommentDto,
	UpdateVideoCommentDto,
} from "./dto/video-comment.dto";
import { AuthGuard } from "../auth/auth.guard";
import { AuthorService } from "../author/author.service";
import type { RequestWithUser } from "../auth/auth.guard";

@Controller()
export class VideoCommentController {
	constructor(
		private readonly videoCommentService: VideoCommentService,
		private readonly authorService: AuthorService,
	) {}

	@UseGuards(AuthGuard)
	@Post("videos/:videoId/comments")
	async create(
		@Param("videoId") videoId: number,
		@Body() dto: CreateVideoCommentDto,
		@Req() req: RequestWithUser,
	) {
		const author = await this.authorService.findByUserId(req.user.sub);
		return this.videoCommentService.create(videoId, author.id, dto);
	}

	@Get("videos/:videoId/comments")
	findByVideo(@Param("videoId") videoId: number) {
		return this.videoCommentService.findByVideo(videoId);
	}

	@Get("video-comments/:id")
	findOne(@Param("id") id: number) {
		return this.videoCommentService.findOne(id);
	}

	@UseGuards(AuthGuard)
	@Put("video-comments/:id")
	async update(
		@Param("id") id: number,
		@Body() dto: UpdateVideoCommentDto,
		@Req() req: RequestWithUser,
	) {
		const author = await this.authorService.findByUserId(req.user.sub);
		return this.videoCommentService.update(id, author.id, dto);
	}

	@UseGuards(AuthGuard)
	@Delete("video-comments/:id")
	async remove(@Param("id") id: number, @Req() req: RequestWithUser) {
		const author = await this.authorService.findByUserId(req.user.sub);
		return this.videoCommentService.remove(id, author.id);
	}
}
