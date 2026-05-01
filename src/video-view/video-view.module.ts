import { forwardRef, Module } from "@nestjs/common";
import { VideoViewController } from "./video-view.controller";
import { VideoViewService } from "./video-view.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VideoView } from "./entities/video-view.entity";
import { AuthorModule } from "../author/author.module";

@Module({
	imports: [
		TypeOrmModule.forFeature([VideoView]),
		forwardRef(() => AuthorModule),
	],
	controllers: [VideoViewController],
	providers: [VideoViewService],
	exports: [VideoViewService],
})
export class VideoViewModule {}
