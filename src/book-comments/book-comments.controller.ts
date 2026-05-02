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
import { BookCommentsService } from "./book-comments.service";
import {
	CreateBookCommentDto,
	UpdateBookCommentDto,
	FilterBookCommentDto,
} from "./book-comments.types";
import {
	CreateBookCommentSchema,
	UpdateBookCommentSchema,
	FilterBookCommentSchema,
} from "./book-comments.validation";

@Controller("book-comments")
export class BookCommentsController {
	constructor(private readonly service: BookCommentsService) {}

	@Post()
	@UsePipes(new JoiValidationPipe(CreateBookCommentSchema))
	create(@Body() dto: CreateBookCommentDto) {
		return this.service.create(dto);
	}

	@Get()
	@UsePipes(new JoiValidationPipe(FilterBookCommentSchema))
	selectMany(@Query() filter: FilterBookCommentDto) {
		return this.service.selectMany(filter);
	}

	@Get(":id")
	selectById(@Param("id") id: string) {
		return this.service.selectById(id);
	}

	@Put(":id")
	@UsePipes(new JoiValidationPipe(UpdateBookCommentSchema))
	update(@Param("id") id: string, @Body() body: UpdateBookCommentDto) {
		return this.service.update(id, body);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.service.remove(id);
	}
}
