import { forwardRef, Module } from "@nestjs/common";
import { VideoViewController } from "./video-view.controller";
import { VideoViewService } from "./video-view.service";
import { AuthorModule } from "../author/author.module";

@Module({
	imports: [forwardRef(() => AuthorModule)],
	controllers: [VideoViewController],
	providers: [VideoViewService],
	exports: [VideoViewService],
})
export class VideoViewModule {}
