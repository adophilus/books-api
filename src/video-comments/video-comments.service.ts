import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { AuthorsService } from "../authors/authors.service";
import { VideosService } from "../videos/videos.service";
import { generateMatricule } from "../@1hand/utils";
import {
	CreateVideoCommentDto,
	UpdateVideoCommentDto,
	FilterVideoCommentDto,
} from "./video-comments.types";
import { toVideoCommentDto } from "./video-comments.mapper";

@Injectable()
export class VideoCommentsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly authorsService: AuthorsService,
		private readonly videosService: VideosService,
	) {}

	async create(dto: CreateVideoCommentDto) {
		await this.videosService.selectById(dto.videoId);
		await this.authorsService.selectById(dto.authorId);

		const entity = await this.prisma.videoComment.create({
			data: {
				code: generateMatricule("VDCM"),
				videoId: dto.videoId,
				authorId: dto.authorId,
				content: dto.content,
			},
		});

		return toVideoCommentDto(entity);
	}

	async selectMany(filter: FilterVideoCommentDto) {
		const page = Math.max(1, Number(filter.page) || 1);
		const limit = Math.max(1, Number(filter.limit) || 10);

		const where: any = {
			deleted: false,
			archived: false,
		};

		if (filter.videoId) where.videoId = filter.videoId;
		if (filter.authorId) where.authorId = filter.authorId;

		const [total, entities] = await this.prisma.$transaction([
			this.prisma.videoComment.count({ where }),
			this.prisma.videoComment.findMany({
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
			data: entities.map(toVideoCommentDto),
		};
	}

	async selectById(id: string) {
		const entity = await this.prisma.videoComment.findFirst({
			where: { id, deleted: false, archived: false },
		});

		if (!entity) {
			throw new NotFoundException("Video comment not found");
		}

		return toVideoCommentDto(entity);
	}

	async update(id: string, body: UpdateVideoCommentDto) {
		await this.selectById(id);

		const entity = await this.prisma.videoComment.update({
			where: { id },
			data: body,
		});

		return toVideoCommentDto(entity);
	}

	async remove(id: string) {
		await this.selectById(id);

		const entity = await this.prisma.videoComment.update({
			where: { id },
			data: { deleted: true },
		});

		return toVideoCommentDto(entity);
	}
}
