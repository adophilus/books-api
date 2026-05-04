import { Module } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { AuthorsModule } from "../authors/authors.module";
import { BooksModule } from "../books/books.module";
import { BookCommentsController } from "./book-comments.controller";
import { BookCommentsService } from "./book-comments.service";

@Module({
	imports: [AuthorsModule, BooksModule],
	controllers: [BookCommentsController],
	providers: [BookCommentsService, PrismaService],
	exports: [BookCommentsService],
})
export class BookCommentsModule {}
