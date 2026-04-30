import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from "@nestjs/common";
import { BookCommentService } from "./book-comment.service";
import {
	CreateBookCommentDto,
	UpdateBookCommentDto,
} from "./dto/create-book-comment.dto";

@Controller()
export class BookCommentController {
	constructor(private readonly bookCommentService: BookCommentService) {}

	@Post("books/:bookId/comments")
	create(
		@Param("bookId") bookId: string,
		@Body() createBookCommentDto: CreateBookCommentDto,
	) {
		return this.bookCommentService.create(+bookId, createBookCommentDto);
	}

	@Get("books/:bookId/comments")
	findByBook(@Param("bookId") bookId: string) {
		return this.bookCommentService.findByBook(+bookId);
	}

	@Get("book-comments/:id")
	findOne(@Param("id") id: string) {
		return this.bookCommentService.findOne(+id);
	}

	@Put("book-comments/:id")
	update(
		@Param("id") id: string,
		@Body() updateBookCommentDto: UpdateBookCommentDto,
	) {
		return this.bookCommentService.update(+id, updateBookCommentDto);
	}

	@Delete("book-comments/:id")
	remove(@Param("id") id: string) {
		return this.bookCommentService.remove(+id);
	}
}
