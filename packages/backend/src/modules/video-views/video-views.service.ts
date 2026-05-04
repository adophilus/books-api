import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { AuthorsService } from "../authors/authors.service";
import { VideosService } from "../videos/videos.service";
import { generateMatricule } from "../../@1hand/utils";
import {
	CreateVideoViewDto,
	UpdateVideoViewDto,
	FilterVideoViewDto,
} from "./video-views.types";
import { toVideoViewDto } from "./video-views.mapper";

@Injectable()
export class VideoViewsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly authorsService: AuthorsService,
		private readonly videosService: VideosService,
	) {}

	async create(dto: CreateVideoViewDto) {
		await this.videosService.selectById(dto.videoId);
		await this.authorsService.selectById(dto.authorId);

		const entity = await this.prisma.videoView.create({
			data: {
				code: generateMatricule("VDVS"),
				videoId: dto.videoId,
				authorId: dto.authorId,
			},
		});

		return toVideoViewDto(entity);
	}

	async selectMany(filter: FilterVideoViewDto) {
		const page = Math.max(1, Number(filter.page) || 1);
		const limit = Math.max(1, Number(filter.limit) || 10);

		const where: any = {
			deleted: false,
			archived: false,
		};

		if (filter.videoId) where.videoId = filter.videoId;
		if (filter.authorId) where.authorId = filter.authorId;

		const [total, entities] = await this.prisma.$transaction([
			this.prisma.videoView.count({ where }),
			this.prisma.videoView.findMany({
				where,
				skip: (page - 1) * limit,
				take: limit,
				orderBy: { createdAt: "desc" },
			}),
		]);

		return {
			page,
			limit,
			total,
			data: entities.map(toVideoViewDto),
		};
	}

	async selectById(id: string) {
		const entity = await this.prisma.videoView.findFirst({
			where: { id, deleted: false, archived: false },
		});

		if (!entity) {
			throw new NotFoundException("Video view not found");
		}

		return toVideoViewDto(entity);
	}

	async update(id: string, body: UpdateVideoViewDto) {
		await this.selectById(id);

		const entity = await this.prisma.videoView.update({
			where: { id },
			data: body,
		});

		return toVideoViewDto(entity);
	}

	async remove(id: string) {
		await this.selectById(id);

		const entity = await this.prisma.videoView.update({
			where: { id },
			data: { deleted: true },
		});

		return toVideoViewDto(entity);
	}
}
