import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from "@nestjs/common";
import { VideoService } from "./video.service";
import { CreateVideoDto, UpdateVideoDto } from "./dto/video.dto";

@Controller("videos")
export class VideoController {
	constructor(private readonly videoService: VideoService) {}

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

	@Put(":id")
	update(@Param("id") id: number, @Body() updateVideoDto: UpdateVideoDto) {
		return this.videoService.update(id, updateVideoDto);
	}

	@Delete(":id")
	remove(@Param("id") id: number) {
		return this.videoService.remove(id);
	}
}
