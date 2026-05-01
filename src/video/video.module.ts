import { forwardRef, Module } from "@nestjs/common";
import { VideoController } from "./video.controller";
import { VideoService } from "./video.service";
import { AuthorModule } from "../author/author.module";

@Module({
	imports: [forwardRef(() => AuthorModule)],
	controllers: [VideoController],
	providers: [VideoService],
	exports: [VideoService],
})
export class VideoModule {}
