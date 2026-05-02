import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { AuthorsModule } from "../authors/authors.module";
import { BooksController } from "./books.controller";
import { BooksService } from "./books.service";

@Module({
	imports: [AuthorsModule],
	controllers: [BooksController],
	providers: [BooksService, PrismaService],
	exports: [BooksService],
})
export class BooksModule {}
