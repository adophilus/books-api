import { Module } from "@nestjs/common";
import { BookViewController } from "./book-view.controller";
import { BookViewService } from "./book-view.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookView } from "./entities/book-view.entity";

@Module({
	imports: [TypeOrmModule.forFeature([BookView])],
	controllers: [BookViewController],
	providers: [BookViewService],
	exports: [BookViewService],
})
export class BookViewModule {}
