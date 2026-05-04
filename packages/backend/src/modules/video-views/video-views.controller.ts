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
import { JoiValidationPipe } from "../../@1hand/pipes/JoiValidatorPipe";
import { VideoViewsService } from "./video-views.service";
import {
	CreateVideoViewDto,
	UpdateVideoViewDto,
	FilterVideoViewDto,
} from "./video-views.types";
import {
	CreateVideoViewSchema,
	UpdateVideoViewSchema,
	FilterVideoViewSchema,
} from "./video-views.validation";

@Controller("video-views")
export class VideoViewsController {
	constructor(private readonly service: VideoViewsService) {}

	@Post()
	@UsePipes(new JoiValidationPipe(CreateVideoViewSchema))
	create(@Body() dto: CreateVideoViewDto) {
		return this.service.create(dto);
	}

	@Get()
	@UsePipes(new JoiValidationPipe(FilterVideoViewSchema))
	selectMany(@Query() filter: FilterVideoViewDto) {
		return this.service.selectMany(filter);
	}

	@Get(":id")
	selectById(@Param("id") id: string) {
		return this.service.selectById(id);
	}

	@Put(":id")
	@UsePipes(new JoiValidationPipe(UpdateVideoViewSchema))
	update(@Param("id") id: string, @Body() body: UpdateVideoViewDto) {
		return this.service.update(id, body);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.service.remove(id);
	}
}
