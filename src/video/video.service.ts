import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateVideoDto, UpdateVideoDto } from "./dto/video.dto";

@Injectable()
export class VideoService {
	constructor(private readonly prisma: PrismaService) {}

	async create(createVideoDto: CreateVideoDto) {
		return this.prisma.video.create({
			data: {
				title: createVideoDto.title,
				description: createVideoDto.description,
				url: createVideoDto.url,
				author: { connect: { id: createVideoDto.author_id } },
			},
			include: { author: true },
		});
	}

	findAll() {
		return this.prisma.video.findMany({ include: { author: true } });
	}

	async findOne(id: number) {
		const video = await this.prisma.video.findUnique({
			where: { id },
			include: { author: true },
		});
		if (!video) throw new NotFoundException(`Video #${id} not found`);
		return video;
	}

	async update(id: number, authorId: number, updateVideoDto: UpdateVideoDto) {
		const video = await this.findOne(id);
		if (video.authorId !== authorId) throw new ForbiddenException();
		return this.prisma.video.update({
			where: { id },
			data: updateVideoDto,
			include: { author: true },
		});
	}

	async remove(id: number, authorId: number) {
		const video = await this.findOne(id);
		if (video.authorId !== authorId) throw new ForbiddenException();
		await this.prisma.video.delete({ where: { id: video.id } });
		return { deleted: true };
	}

	findByAuthor(authorId: number) {
		return this.prisma.video.findMany({
			where: { authorId },
			include: { author: true },
		});
	}
}
