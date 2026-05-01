import { forwardRef, Module } from "@nestjs/common";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { AuthorModule } from "../author/author.module";

@Module({
	imports: [forwardRef(() => AuthorModule)],
	controllers: [BookController],
	providers: [BookService],
	exports: [BookService],
})
export class BookModule {}
