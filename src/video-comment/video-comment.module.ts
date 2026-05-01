import { forwardRef, Module } from "@nestjs/common";
import { VideoCommentController } from "./video-comment.controller";
import { VideoCommentService } from "./video-comment.service";
import { AuthorModule } from "../author/author.module";

@Module({
	imports: [forwardRef(() => AuthorModule)],
	controllers: [VideoCommentController],
	providers: [VideoCommentService],
	exports: [VideoCommentService],
})
export class VideoCommentModule {}
