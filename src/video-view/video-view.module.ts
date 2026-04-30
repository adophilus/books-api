import { Module } from "@nestjs/common";
import { VideoViewController } from "./video-view.controller";
import { VideoViewService } from "./video-view.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VideoView } from "./entities/video-view.entity";

@Module({
	imports: [TypeOrmModule.forFeature([VideoView])],
	controllers: [VideoViewController],
	providers: [VideoViewService],
	exports: [VideoViewService],
})
export class VideoViewModule {}
