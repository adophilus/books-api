import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthorModule } from "./author/author.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { BookModule } from "./book/book.module";
import { VideoModule } from "./video/video.module";
import { BookViewModule } from "./book-view/book-view.module";
import { VideoViewModule } from "./video-view/video-view.module";
import { BookCommentModule } from "./book-comment/book-comment.module";
import { VideoCommentModule } from "./video-comment/video-comment.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as Joi from "joi";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [
		ConfigModule.forRoot({
			validationSchema: Joi.object({
				DATABASE_URL: Joi.string(),
				JWT_SECRET: Joi.string().min(32),
			}),
		}),
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: "mysql",
				url: configService.get<string>("DATABASE_URL"),
				autoLoadEntities: true,
				synchronize: true, // dev only — use migrations in production
			}),
		}),
		AuthorModule,
		AuthModule,
		UsersModule,
		BookModule,
		VideoModule,
		BookViewModule,
		VideoViewModule,
		BookCommentModule,
		VideoCommentModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
