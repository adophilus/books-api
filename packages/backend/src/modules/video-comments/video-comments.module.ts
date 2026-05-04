import { Module } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { AuthorsModule } from "../authors/authors.module";
import { VideosModule } from "../videos/videos.module";
import { VideoCommentsController } from "./video-comments.controller";
import { VideoCommentsService } from "./video-comments.service";

@Module({
	imports: [AuthorsModule, VideosModule],
	controllers: [VideoCommentsController],
	providers: [VideoCommentsService, PrismaService],
	exports: [VideoCommentsService],
})
export class VideoCommentsModule {}
