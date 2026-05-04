import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { AuthorsService } from "../authors/authors.service";
import { generateMatricule } from "../../@1hand/utils";
import {
	CreateVideoDto,
	UpdateVideoDto,
	FilterVideoDto,
} from "./videos.types";
import { toVideoDto } from "./videos.mapper";

@Injectable()
export class VideosService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly authorsService: AuthorsService,
	) {}

	async create(dto: CreateVideoDto) {
		await this.authorsService.selectById(dto.authorId);

		const entity = await this.prisma.video.create({
			data: {
				code: generateMatricule("VID"),
				title: dto.title,
				description: dto.description,
				url: dto.url,
				authorId: dto.authorId,
			},
			include: { author: true },
		});

		return toVideoDto(entity);
	}

	async selectMany(filter: FilterVideoDto) {
		const page = Math.max(1, Number(filter.page) || 1);
		const limit = Math.max(1, Number(filter.limit) || 10);
		const search = filter.search?.trim();

		let authorId: string | undefined = undefined;

		if (filter.authorId) {
			await this.authorsService.selectById(filter.authorId);
			authorId = filter.authorId;
		}

		const where = {
			deleted: false,
			archived: false,
			authorId,
			OR: search
				? [
						{ title: { contains: search } },
						{ description: { contains: search } },
					]
				: undefined,
		};

		const [total, entities] = await this.prisma.$transaction([
			this.prisma.video.count({ where }),
			this.prisma.video.findMany({
				where,
				skip: (page - 1) * limit,
				take: limit,
				orderBy: { createdAt: "desc" },
				include: { author: true },
			}),
		]);

		return {
			page,
			limit,
			total,
			data: entities.map(toVideoDto),
		};
	}

	async selectById(id: string) {
		const entity = await this.prisma.video.findFirst({
			where: { id, deleted: false, archived: false },
			include: { author: true },
		});

		if (!entity) {
			throw new NotFoundException("Video not found");
		}

		return toVideoDto(entity);
	}

	async update(id: string, body: UpdateVideoDto) {
		await this.selectById(id);

		const entity = await this.prisma.video.update({
			where: { id },
			data: body,
			include: { author: true },
		});

		return toVideoDto(entity);
	}

	async remove(id: string) {
		await this.selectById(id);

		const entity = await this.prisma.video.update({
			where: { id },
			data: { deleted: true },
			include: { author: true },
		});

		return toVideoDto(entity);
	}
}
