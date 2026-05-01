import { forwardRef, Module } from "@nestjs/common";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "./entities/book.entity";
import { AuthorModule } from "../author/author.module";

@Module({
	imports: [TypeOrmModule.forFeature([Book]), forwardRef(() => AuthorModule)],
	controllers: [BookController],
	providers: [BookService],
	exports: [BookService],
})
export class BookModule {}
