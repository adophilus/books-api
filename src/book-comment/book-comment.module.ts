import { forwardRef, Module } from "@nestjs/common";
import { BookCommentController } from "./book-comment.controller";
import { BookCommentService } from "./book-comment.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookComment } from "./entities/book-comment.entity";
import { AuthorModule } from "../author/author.module";

@Module({
	imports: [
		TypeOrmModule.forFeature([BookComment]),
		forwardRef(() => AuthorModule),
	],
	controllers: [BookCommentController],
	providers: [BookCommentService],
	exports: [BookCommentService],
})
export class BookCommentModule {}
