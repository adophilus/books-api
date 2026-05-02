import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { AuthorsModule } from "../authors/authors.module";
import { VideosController } from "./videos.controller";
import { VideosService } from "./videos.service";

@Module({
	imports: [AuthorsModule],
	controllers: [VideosController],
	providers: [VideosService, PrismaService],
	exports: [VideosService],
})
export class VideosModule {}
