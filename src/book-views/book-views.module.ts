import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { AuthorsModule } from "../authors/authors.module";
import { BooksModule } from "../books/books.module";
import { BookViewsController } from "./book-views.controller";
import { BookViewsService } from "./book-views.service";

@Module({
	imports: [AuthorsModule, BooksModule],
	controllers: [BookViewsController],
	providers: [BookViewsService, PrismaService],
	exports: [BookViewsService],
})
export class BookViewsModule {}
