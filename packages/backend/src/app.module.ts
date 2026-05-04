import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthorsModule } from "./modules/authors/authors.module";
import { BooksModule } from "./modules/books/books.module";
import { VideosModule } from "./modules/videos/videos.module";
import { BookViewsModule } from "./modules/book-views/book-views.module";
import { VideoViewsModule } from "./modules/video-views/video-views.module";
import { BookCommentsModule } from "./modules/book-comments/book-comments.module";
import { VideoCommentsModule } from "./modules/video-comments/video-comments.module";
import * as Joi from "joi";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validationSchema: Joi.object({
				DATABASE_URL: Joi.string().required(),
			}),
		}),
		AuthorsModule,
		BooksModule,
		VideosModule,
		BookViewsModule,
		VideoViewsModule,
		BookCommentsModule,
		VideoCommentsModule,
	],
})
export class AppModule {}
