import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VideoView } from "./entities/video-view.entity";
import { Repository } from "typeorm";

@Injectable()
export class VideoViewService {
	constructor(
		@InjectRepository(VideoView)
		private readonly videoViewRepository: Repository<VideoView>,
	) {}

	async create(videoId: number, authorId: number) {
		const view = this.videoViewRepository.create({
			video: { id: videoId },
			author: { id: authorId },
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

	async remove(id: number, authorId: number) {
		const view = await this.findOne(id);
		if (view.author.id !== authorId) throw new ForbiddenException();
		await this.videoViewRepository.remove(view);
		return { deleted: true };
	}
}
