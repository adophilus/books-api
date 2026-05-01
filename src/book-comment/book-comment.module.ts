import { forwardRef, Module } from "@nestjs/common";
import { BookCommentController } from "./book-comment.controller";
import { BookCommentService } from "./book-comment.service";
import { AuthorModule } from "../author/author.module";

@Module({
	imports: [forwardRef(() => AuthorModule)],
	controllers: [BookCommentController],
	providers: [BookCommentService],
	exports: [BookCommentService],
})
export class BookCommentModule {}
