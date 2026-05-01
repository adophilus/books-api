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
import { AuthorService } from "./author.service";
import { CreateAuthorDto, UpdateAuthorDto } from "./dto/author.dto";
import { BookService } from "../book/book.service";
import { VideoService } from "../video/video.service";
import { BookViewService } from "../book-view/book-view.service";
import { VideoViewService } from "../video-view/video-view.service";
import { AuthGuard } from "../auth/auth.guard";
import type { RequestWithUser } from "../auth/auth.guard";

@Controller("authors")
export class AuthorController {
	constructor(
		private readonly authorService: AuthorService,
		private readonly bookService: BookService,
		private readonly videoService: VideoService,
		private readonly bookViewService: BookViewService,
		private readonly videoViewService: VideoViewService,
	) {}

	@UseGuards(AuthGuard)
	@Post()
	create(
		@Body() createAuthorDto: CreateAuthorDto,
		@Req() req: RequestWithUser,
	) {
		return this.authorService.create(req.user.sub, createAuthorDto);
	}

	@Get()
	findAll() {
		return this.authorService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: number) {
		return this.authorService.findOne(id);
	}

	@Put(":id")
	update(@Param("id") id: number, @Body() updateAuthorDto: UpdateAuthorDto) {
		return this.authorService.update(id, updateAuthorDto);
	}

	@Delete(":id")
	remove(@Param("id") id: number) {
		return this.authorService.remove(id);
	}

	@Get(":authorId/books")
	findBooks(@Param("authorId") authorId: number) {
		return this.bookService.findByAuthor(authorId);
	}

	@Get(":authorId/videos")
	findVideos(@Param("authorId") authorId: number) {
		return this.videoService.findByAuthor(authorId);
	}

	@Get(":authorId/book-views")
	findBookViews(@Param("authorId") authorId: number) {
		return this.bookViewService.findByAuthor(authorId);
	}

	@Get(":authorId/video-views")
	findVideoViews(@Param("authorId") authorId: number) {
		return this.videoViewService.findByAuthor(authorId);
	}
}
