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
import { BookCommentService } from "./book-comment.service";
import {
	CreateBookCommentDto,
	UpdateBookCommentDto,
} from "./dto/book-comment.dto";
import { AuthGuard } from "../auth/auth.guard";
import { AuthorService } from "../author/author.service";
import type { RequestWithUser } from "../auth/auth.guard";

@Controller()
export class BookCommentController {
	constructor(
		private readonly bookCommentService: BookCommentService,
		private readonly authorService: AuthorService,
	) {}

	@UseGuards(AuthGuard)
	@Post("books/:bookId/comments")
	async create(
		@Param("bookId") bookId: number,
		@Body() dto: CreateBookCommentDto,
		@Req() req: RequestWithUser,
	) {
		const author = await this.authorService.findByUserId(req.user.sub);
		return this.bookCommentService.create(bookId, author.id, dto);
	}

	@Get("books/:bookId/comments")
	findByBook(@Param("bookId") bookId: number) {
		return this.bookCommentService.findByBook(bookId);
	}

	@Get("book-comments/:id")
	findOne(@Param("id") id: number) {
		return this.bookCommentService.findOne(id);
	}

	@UseGuards(AuthGuard)
	@Put("book-comments/:id")
	async update(
		@Param("id") id: number,
		@Body() dto: UpdateBookCommentDto,
		@Req() req: RequestWithUser,
	) {
		const author = await this.authorService.findByUserId(req.user.sub);
		return this.bookCommentService.update(id, author.id, dto);
	}

	@UseGuards(AuthGuard)
	@Delete("book-comments/:id")
	async remove(@Param("id") id: number, @Req() req: RequestWithUser) {
		const author = await this.authorService.findByUserId(req.user.sub);
		return this.bookCommentService.remove(id, author.id);
	}
}
