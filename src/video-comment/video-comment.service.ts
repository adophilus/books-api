import { Injectable, NotFoundException } from "@nestjs/common";
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

	async create(videoId: number, createVideoCommentDto: CreateVideoCommentDto) {
		const comment = this.videoCommentRepository.create({
			video: { id: videoId },
			author: { id: createVideoCommentDto.author_id },
			content: createVideoCommentDto.content,
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

	async update(id: number, updateVideoCommentDto: UpdateVideoCommentDto) {
		await this.findOne(id);
		await this.videoCommentRepository.update(id, updateVideoCommentDto);
		return this.findOne(id);
	}

	async remove(id: number) {
		const comment = await this.findOne(id);
		await this.videoCommentRepository.remove(comment);
		return { deleted: true };
	}
}
