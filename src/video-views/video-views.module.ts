import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { AuthorsModule } from "../authors/authors.module";
import { VideosModule } from "../videos/videos.module";
import { VideoViewsController } from "./video-views.controller";
import { VideoViewsService } from "./video-views.service";

@Module({
	imports: [AuthorsModule, VideosModule],
	controllers: [VideoViewsController],
	providers: [VideoViewsService, PrismaService],
	exports: [VideoViewsService],
})
export class VideoViewsModule {}
