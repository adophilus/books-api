import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { BookViewService } from "./book-view.service";
import { CreateBookViewDto } from "./dto/create-book-view.dto";

@Controller()
export class BookViewController {
	constructor(private readonly bookViewService: BookViewService) {}

	@Post("books/:bookId/views")
	create(
		@Param("bookId") bookId: string,
		@Body() createBookViewDto: CreateBookViewDto,
	) {
		return this.bookViewService.create(+bookId, createBookViewDto);
	}

	@Get("books/:bookId/views")
	findByBook(@Param("bookId") bookId: string) {
		return this.bookViewService.findByBook(+bookId);
	}

	@Delete("book-views/:id")
	remove(@Param("id") id: string) {
		return this.bookViewService.remove(+id);
	}
}
