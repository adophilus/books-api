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
import { VideoService } from "./video.service";
import { CreateVideoDto, UpdateVideoDto } from "./dto/video.dto";
import { AuthGuard } from "../auth/auth.guard";
import { AuthorService } from "../author/author.service";
import type { RequestWithUser } from "../auth/auth.guard";

@Controller("videos")
export class VideoController {
	constructor(
		private readonly videoService: VideoService,
		private readonly authorService: AuthorService,
	) {}

	@Post()
	create(@Body() createVideoDto: CreateVideoDto) {
		return this.videoService.create(createVideoDto);
	}

	@Get()
	findAll() {
		return this.videoService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: number) {
		return this.videoService.findOne(id);
	}

	@UseGuards(AuthGuard)
	@Put(":id")
	async update(
		@Param("id") id: number,
		@Body() updateVideoDto: UpdateVideoDto,
		@Req() req: RequestWithUser,
	) {
		const author = await this.authorService.findByUserId(req.user.sub);
		return this.videoService.update(id, author.id, updateVideoDto);
	}

	@UseGuards(AuthGuard)
	@Delete(":id")
	async remove(@Param("id") id: number, @Req() req: RequestWithUser) {
		const author = await this.authorService.findByUserId(req.user.sub);
		return this.videoService.remove(id, author.id);
	}
}
