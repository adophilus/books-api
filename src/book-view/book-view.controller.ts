import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { BookViewService } from "./book-view.service";
import { CreateBookViewDto } from "./dto/book-view.dto";

@Controller()
export class BookViewController {
	constructor(private readonly bookViewService: BookViewService) {}

	@Post("books/:bookId/views")
	create(
		@Param("bookId") bookId: number,
		@Body() createBookViewDto: CreateBookViewDto,
	) {
		return this.bookViewService.create(bookId, createBookViewDto);
	}

	@Get("books/:bookId/views")
	findByBook(@Param("bookId") bookId: number) {
		return this.bookViewService.findByBook(bookId);
	}

	@Delete("book-views/:id")
	remove(@Param("id") id: number) {
		return this.bookViewService.remove(id);
	}
}
