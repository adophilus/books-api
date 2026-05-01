import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Video } from "./entities/video.entity";
import { Repository } from "typeorm";
import { CreateVideoDto, UpdateVideoDto } from "./dto/video.dto";

@Injectable()
export class VideoService {
	constructor(
		@InjectRepository(Video)
		private readonly videoRepository: Repository<Video>,
	) {}

	async create(createVideoDto: CreateVideoDto) {
		const video = this.videoRepository.create({
			title: createVideoDto.title,
			description: createVideoDto.description,
			url: createVideoDto.url,
			author: { id: createVideoDto.author_id },
		});
		return this.videoRepository.save(video);
	}

	findAll() {
		return this.videoRepository.find({ relations: ["author"] });
	}

	async findOne(id: number) {
		const video = await this.videoRepository.findOne({
			where: { id },
			relations: ["author"],
		});
		if (!video) throw new NotFoundException(`Video #${id} not found`);
		return video;
	}

	async update(id: number, authorId: number, updateVideoDto: UpdateVideoDto) {
		const video = await this.findOne(id);
		if (video.author.id !== authorId) throw new ForbiddenException();
		await this.videoRepository.update(id, updateVideoDto);
		return this.findOne(id);
	}

	async remove(id: number, authorId: number) {
		const video = await this.findOne(id);
		if (video.author.id !== authorId) throw new ForbiddenException();
		await this.videoRepository.remove(video);
		return { deleted: true };
	}

	findByAuthor(authorId: number) {
		return this.videoRepository.find({
			where: { author: { id: authorId } },
			relations: ["author"],
		});
	}
}
