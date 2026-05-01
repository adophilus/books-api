import { forwardRef, Module } from "@nestjs/common";
import { BookViewController } from "./book-view.controller";
import { BookViewService } from "./book-view.service";
import { AuthorModule } from "../author/author.module";

@Module({
	imports: [forwardRef(() => AuthorModule)],
	controllers: [BookViewController],
	providers: [BookViewService],
	exports: [BookViewService],
})
export class BookViewModule {}
