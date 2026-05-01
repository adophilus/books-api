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
import { BookService } from "./book.service";
import { CreateBookDto, UpdateBookDto } from "./dto/book.dto";
import { AuthGuard } from "../auth/auth.guard";
import { AuthorService } from "../author/author.service";
import type { RequestWithUser } from "../auth/auth.guard";

@Controller("books")
export class BookController {
	constructor(
		private readonly bookService: BookService,
		private readonly authorService: AuthorService,
	) {}

	@Post()
	create(@Body() createBookDto: CreateBookDto) {
		return this.bookService.create(createBookDto);
	}

	@Get()
	findAll() {
		return this.bookService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: number) {
		return this.bookService.findOne(id);
	}

	@UseGuards(AuthGuard)
	@Put(":id")
	async update(
		@Param("id") id: number,
		@Body() updateBookDto: UpdateBookDto,
		@Req() req: RequestWithUser,
	) {
		const author = await this.authorService.findByUserId(req.user.sub);
		return this.bookService.update(id, author.id, updateBookDto);
	}

	@UseGuards(AuthGuard)
	@Delete(":id")
	async remove(@Param("id") id: number, @Req() req: RequestWithUser) {
		const author = await this.authorService.findByUserId(req.user.sub);
		return this.bookService.remove(id, author.id);
	}
}
