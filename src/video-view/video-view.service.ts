import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class VideoViewService {
	constructor(private readonly prisma: PrismaService) {}

	async create(videoId: number, authorId: number) {
		return this.prisma.videoView.create({
			data: {
				video: { connect: { id: videoId } },
				author: { connect: { id: authorId } },
			},
			include: { author: true },
		});
	}

	findByVideo(videoId: number) {
		return this.prisma.videoView.findMany({
			where: { videoId },
			include: { author: true },
		});
	}

	findByAuthor(authorId: number) {
		return this.prisma.videoView.findMany({
			where: { authorId },
			include: { video: { include: { author: true } } },
		});
	}

	async findOne(id: number) {
		const view = await this.prisma.videoView.findUnique({
			where: { id },
			include: { author: true, video: true },
		});
		if (!view) throw new NotFoundException(`VideoView #${id} not found`);
		return view;
	}

	async remove(id: number, authorId: number) {
		const view = await this.findOne(id);
		if (view.authorId !== authorId) throw new ForbiddenException();
		await this.prisma.videoView.delete({ where: { id: view.id } });
		return { deleted: true };
	}
}
