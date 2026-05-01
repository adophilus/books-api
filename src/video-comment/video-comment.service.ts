import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateVideoCommentDto, UpdateVideoCommentDto } from "./dto/video-comment.dto";

@Injectable()
export class VideoCommentService {
	constructor(private readonly prisma: PrismaService) {}

	async create(videoId: number, authorId: number, dto: CreateVideoCommentDto) {
		return this.prisma.videoComment.create({
			data: {
				video: { connect: { id: videoId } },
				author: { connect: { id: authorId } },
				content: dto.content,
			},
			include: { author: true },
		});
	}

	findByVideo(videoId: number) {
		return this.prisma.videoComment.findMany({
			where: { videoId },
			include: { author: true },
		});
	}

	async findOne(id: number) {
		const comment = await this.prisma.videoComment.findUnique({
			where: { id },
			include: { author: true, video: true },
		});
		if (!comment)
			throw new NotFoundException(`VideoComment #${id} not found`);
		return comment;
	}

	async update(id: number, authorId: number, dto: UpdateVideoCommentDto) {
		const comment = await this.findOne(id);
		if (comment.authorId !== authorId) throw new ForbiddenException();
		return this.prisma.videoComment.update({
			where: { id },
			data: dto,
			include: { author: true },
		});
	}

	async remove(id: number, authorId: number) {
		const comment = await this.findOne(id);
		if (comment.authorId !== authorId) throw new ForbiddenException();
		await this.prisma.videoComment.delete({ where: { id: comment.id } });
		return { deleted: true };
	}
}
