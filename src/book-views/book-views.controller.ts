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
import { JoiValidationPipe } from "../@1hand/pipes/JoiValidatorPipe";
import { BookViewsService } from "./book-views.service";
import {
	CreateBookViewDto,
	UpdateBookViewDto,
	FilterBookViewDto,
} from "./book-views.types";
import {
	CreateBookViewSchema,
	UpdateBookViewSchema,
	FilterBookViewSchema,
} from "./book-views.validation";

@Controller("book-views")
export class BookViewsController {
	constructor(private readonly service: BookViewsService) {}

	@Post()
	@UsePipes(new JoiValidationPipe(CreateBookViewSchema))
	create(@Body() dto: CreateBookViewDto) {
		return this.service.create(dto);
	}

	@Get()
	@UsePipes(new JoiValidationPipe(FilterBookViewSchema))
	selectMany(@Query() filter: FilterBookViewDto) {
		return this.service.selectMany(filter);
	}

	@Get(":id")
	selectById(@Param("id") id: string) {
		return this.service.selectById(id);
	}

	@Put(":id")
	@UsePipes(new JoiValidationPipe(UpdateBookViewSchema))
	update(@Param("id") id: string, @Body() body: UpdateBookViewDto) {
		return this.service.update(id, body);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.service.remove(id);
	}
}
