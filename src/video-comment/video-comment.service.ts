import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VideoComment } from "./entities/video-comment.entity";
import { Repository } from "typeorm";
import { CreateVideoCommentDto, UpdateVideoCommentDto } from "./dto/video-comment.dto";

@Injectable()
export class VideoCommentService {
	constructor(
		@InjectRepository(VideoComment)
		private readonly videoCommentRepository: Repository<VideoComment>,
	) {}

	async create(videoId: number, authorId: number, dto: CreateVideoCommentDto) {
		const comment = this.videoCommentRepository.create({
			video: { id: videoId },
			author: { id: authorId },
			content: dto.content,
		});
		return this.videoCommentRepository.save(comment);
	}

	findByVideo(videoId: number) {
		return this.videoCommentRepository.find({
			where: { video: { id: videoId } },
			relations: ["author"],
		});
	}

	async findOne(id: number) {
		const comment = await this.videoCommentRepository.findOne({
			where: { id },
			relations: ["author", "video"],
		});
		if (!comment)
			throw new NotFoundException(`VideoComment #${id} not found`);
		return comment;
	}

	async update(id: number, authorId: number, dto: UpdateVideoCommentDto) {
		const comment = await this.findOne(id);
		if (comment.author.id !== authorId) throw new ForbiddenException();
		await this.videoCommentRepository.update(id, dto);
		return this.findOne(id);
	}

	async remove(id: number, authorId: number) {
		const comment = await this.findOne(id);
		if (comment.author.id !== authorId) throw new ForbiddenException();
		await this.videoCommentRepository.remove(comment);
		return { deleted: true };
	}
}
