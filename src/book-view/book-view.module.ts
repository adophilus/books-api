import { forwardRef, Module } from "@nestjs/common";
import { BookViewController } from "./book-view.controller";
import { BookViewService } from "./book-view.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookView } from "./entities/book-view.entity";
import { AuthorModule } from "../author/author.module";

@Module({
	imports: [
		TypeOrmModule.forFeature([BookView]),
		forwardRef(() => AuthorModule),
	],
	controllers: [BookViewController],
	providers: [BookViewService],
	exports: [BookViewService],
})
export class BookViewModule {}
