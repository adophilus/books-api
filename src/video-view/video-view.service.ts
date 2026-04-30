import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VideoView } from "./entities/video-view.entity";
import { Repository } from "typeorm";
import { CreateVideoViewDto } from "./dto/create-video-view.dto";

@Injectable()
export class VideoViewService {
	constructor(
		@InjectRepository(VideoView)
		private readonly videoViewRepository: Repository<VideoView>,
	) {}

	async create(videoId: number, createVideoViewDto: CreateVideoViewDto) {
		const view = this.videoViewRepository.create({
			video: { id: videoId },
			author: { id: createVideoViewDto.author_id },
		});
		return this.videoViewRepository.save(view);
	}

	findByVideo(videoId: number) {
		return this.videoViewRepository.find({
			where: { video: { id: videoId } },
			relations: ["author"],
		});
	}

	findByAuthor(authorId: number) {
		return this.videoViewRepository.find({
			where: { author: { id: authorId } },
			relations: ["video", "video.author"],
		});
	}

	async findOne(id: number) {
		const view = await this.videoViewRepository.findOne({
			where: { id },
			relations: ["author", "video"],
		});
		if (!view) throw new NotFoundException(`VideoView #${id} not found`);
		return view;
	}

	async remove(id: number) {
		const view = await this.findOne(id);
		await this.videoViewRepository.remove(view);
		return { deleted: true };
	}
}
