import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from "@nestjs/common";
import { VideoCommentService } from "./video-comment.service";
import {
	CreateVideoCommentDto,
	UpdateVideoCommentDto,
} from "./dto/create-video-comment.dto";

@Controller()
export class VideoCommentController {
	constructor(private readonly videoCommentService: VideoCommentService) {}

	@Post("videos/:videoId/comments")
	create(
		@Param("videoId") videoId: string,
		@Body() createVideoCommentDto: CreateVideoCommentDto,
	) {
		return this.videoCommentService.create(+videoId, createVideoCommentDto);
	}

	@Get("videos/:videoId/comments")
	findByVideo(@Param("videoId") videoId: string) {
		return this.videoCommentService.findByVideo(+videoId);
	}

	@Get("video-comments/:id")
	findOne(@Param("id") id: string) {
		return this.videoCommentService.findOne(+id);
	}

	@Put("video-comments/:id")
	update(
		@Param("id") id: string,
		@Body() updateVideoCommentDto: UpdateVideoCommentDto,
	) {
		return this.videoCommentService.update(+id, updateVideoCommentDto);
	}

	@Delete("video-comments/:id")
	remove(@Param("id") id: string) {
		return this.videoCommentService.remove(+id);
	}
}
