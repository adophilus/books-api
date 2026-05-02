import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthorsModule } from "./authors/authors.module";
import { BooksModule } from "./books/books.module";
import { VideosModule } from "./videos/videos.module";
import { BookViewsModule } from "./book-views/book-views.module";
import { VideoViewsModule } from "./video-views/video-views.module";
import { BookCommentsModule } from "./book-comments/book-comments.module";
import { VideoCommentsModule } from "./video-comments/video-comments.module";
import * as Joi from "joi";

@Module({
	imports: [
		ConfigModule.forRoot({
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
