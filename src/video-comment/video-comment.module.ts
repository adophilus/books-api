import { forwardRef, Module } from "@nestjs/common";
import { VideoCommentController } from "./video-comment.controller";
import { VideoCommentService } from "./video-comment.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VideoComment } from "./entities/video-comment.entity";
import { AuthorModule } from "../author/author.module";

@Module({
	imports: [
		TypeOrmModule.forFeature([VideoComment]),
		forwardRef(() => AuthorModule),
	],
	controllers: [VideoCommentController],
	providers: [VideoCommentService],
	exports: [VideoCommentService],
})
export class VideoCommentModule {}
