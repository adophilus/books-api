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
import { BooksService } from "./books.service";
import {
	CreateBookDto,
	UpdateBookDto,
	FilterBookDto,
} from "./books.types";
import {
	CreateBookSchema,
	UpdateBookSchema,
	FilterBookSchema,
} from "./books.validation";

@Controller("books")
export class BooksController {
	constructor(private readonly service: BooksService) {}

	@Post()
	@UsePipes(new JoiValidationPipe(CreateBookSchema))
	create(@Body() dto: CreateBookDto) {
		return this.service.create(dto);
	}

	@Get()
	@UsePipes(new JoiValidationPipe(FilterBookSchema))
	selectMany(@Query() filter: FilterBookDto) {
		return this.service.selectMany(filter);
	}

	@Get(":id")
	selectById(@Param("id") id: string) {
		return this.service.selectById(id);
	}

	@Put(":id")
	@UsePipes(new JoiValidationPipe(UpdateBookSchema))
	update(@Param("id") id: string, @Body() body: UpdateBookDto) {
		return this.service.update(id, body);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.service.remove(id);
	}
}
