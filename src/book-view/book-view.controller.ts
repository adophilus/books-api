import { Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { BookViewService } from "./book-view.service";
import { AuthGuard } from "../auth/auth.guard";
import { AuthorService } from "../author/author.service";
import type { RequestWithUser } from "../auth/auth.guard";

@Controller()
export class BookViewController {
	constructor(
		private readonly bookViewService: BookViewService,
		private readonly authorService: AuthorService,
	) {}

	@UseGuards(AuthGuard)
	@Post("books/:bookId/views")
	async create(@Param("bookId") bookId: number, @Req() req: RequestWithUser) {
		const author = await this.authorService.findByUserId(req.user.sub);
		return this.bookViewService.create(bookId, author.id);
	}

	@Get("books/:bookId/views")
	findByBook(@Param("bookId") bookId: number) {
		return this.bookViewService.findByBook(bookId);
	}

	@UseGuards(AuthGuard)
	@Delete("book-views/:id")
	async remove(@Param("id") id: number, @Req() req: RequestWithUser) {
		const author = await this.authorService.findByUserId(req.user.sub);
		return this.bookViewService.remove(id, author.id);
	}
}
