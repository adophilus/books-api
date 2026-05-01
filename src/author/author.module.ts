import { forwardRef, Module } from "@nestjs/common";
import { AuthorController } from "./author.controller";
import { AuthorService } from "./author.service";
import { BookModule } from "../book/book.module";
import { VideoModule } from "../video/video.module";
import { BookViewModule } from "../book-view/book-view.module";
import { VideoViewModule } from "../video-view/video-view.module";

@Module({
	imports: [
		forwardRef(() => BookModule),
		forwardRef(() => VideoModule),
		forwardRef(() => BookViewModule),
		forwardRef(() => VideoViewModule),
	],
	controllers: [AuthorController],
	providers: [AuthorService],
	exports: [AuthorService],
})
export class AuthorModule {}
