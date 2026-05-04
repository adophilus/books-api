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
import { VideosService } from "./videos.service";
import {
	CreateVideoDto,
	UpdateVideoDto,
	FilterVideoDto,
} from "./videos.types";
import {
	CreateVideoSchema,
	UpdateVideoSchema,
	FilterVideoSchema,
} from "./videos.validation";

@Controller("videos")
export class VideosController {
	constructor(private readonly service: VideosService) {}

	@Post()
	@UsePipes(new JoiValidationPipe(CreateVideoSchema))
	create(@Body() dto: CreateVideoDto) {
		return this.service.create(dto);
	}

	@Get()
	@UsePipes(new JoiValidationPipe(FilterVideoSchema))
	selectMany(@Query() filter: FilterVideoDto) {
		return this.service.selectMany(filter);
	}

	@Get(":id")
	selectById(@Param("id") id: string) {
		return this.service.selectById(id);
	}

	@Put(":id")
	@UsePipes(new JoiValidationPipe(UpdateVideoSchema))
	update(@Param("id") id: string, @Body() body: UpdateVideoDto) {
		return this.service.update(id, body);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.service.remove(id);
	}
}
