import { forwardRef, Module } from "@nestjs/common";
import { VideoController } from "./video.controller";
import { VideoService } from "./video.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Video } from "./entities/video.entity";
import { AuthorModule } from "../author/author.module";

@Module({
	imports: [TypeOrmModule.forFeature([Video]), forwardRef(() => AuthorModule)],
	controllers: [VideoController],
	providers: [VideoService],
	exports: [VideoService],
})
export class VideoModule {}
