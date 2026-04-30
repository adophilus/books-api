import { Module } from "@nestjs/common";
import { BookCommentController } from "./book-comment.controller";
import { BookCommentService } from "./book-comment.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookComment } from "./entities/book-comment.entity";

@Module({
	imports: [TypeOrmModule.forFeature([BookComment])],
	controllers: [BookCommentController],
	providers: [BookCommentService],
	exports: [BookCommentService],
})
export class BookCommentModule {}
