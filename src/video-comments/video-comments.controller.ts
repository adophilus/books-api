import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
} from "@nestjs/common";
import { JoiValidationPipe } from "../pipes/JoiValidatorPipe";
import { VideoCommentsService } from "./video-comments.service";
import {
	CreateVideoCommentDto,
	UpdateVideoCommentDto,
	FilterVideoCommentDto,
} from "./video-comments.types";
import {
	CreateVideoCommentSchema,
	UpdateVideoCommentSchema,
	FilterVideoCommentSchema,
} from "./video-comments.validation";

@Controller("video-comments")
export class VideoCommentsController {
	constructor(private readonly service: VideoCommentsService) {}

	@Post()
	@UsePipes(new JoiValidationPipe(CreateVideoCommentSchema))
	create(@Body() dto: CreateVideoCommentDto) {
		return this.service.create(dto);
	}

	@Get()
	@UsePipes(new JoiValidationPipe(FilterVideoCommentSchema))
	selectMany(@Query() filter: FilterVideoCommentDto) {
		return this.service.selectMany(filter);
	}

	@Get(":id")
	selectById(@Param("id") id: string) {
		return this.service.selectById(id);
	}

	@Put(":id")
	@UsePipes(new JoiValidationPipe(UpdateVideoCommentSchema))
	update(@Param("id") id: string, @Body() body: UpdateVideoCommentDto) {
		return this.service.update(id, body);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.service.remove(id);
	}
}
