import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { generateMatricule } from "../utils";
import {
	CreateAuthorDto,
	UpdateAuthorDto,
	FilterAuthorDto,
} from "./authors.types";
import { toAuthorDto } from "./authors.mapper";

@Injectable()
export class AuthorsService {
	constructor(private readonly prisma: PrismaService) {}

	async create(dto: CreateAuthorDto) {
		const entity = await this.prisma.author.create({
			data: {
				code: generateMatricule("AUTH"),
				name: dto.name,
				email: dto.email,
			},
		});

		return toAuthorDto(entity);
	}

	async selectMany(filter: FilterAuthorDto) {
		const page = Math.max(1, Number(filter.page) || 1);
		const limit = Math.max(1, Number(filter.limit) || 10);
		const search = filter.search?.trim();

		const where = {
			deleted: false,
			archived: false,
			OR: search
				? [
						{ name: { contains: search } },
						{ email: { contains: search } },
					]
				: undefined,
		};

		const [total, entities] = await this.prisma.$transaction([
			this.prisma.author.count({ where }),
			this.prisma.author.findMany({
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
			data: entities.map(toAuthorDto),
		};
	}

	async selectById(id: string) {
		const entity = await this.prisma.author.findFirst({
			where: { id, deleted: false, archived: false },
		});

		if (!entity) {
			throw new NotFoundException("Author not found");
		}

		return toAuthorDto(entity);
	}

	async update(id: string, body: UpdateAuthorDto) {
		await this.selectById(id);

		const entity = await this.prisma.author.update({
			where: { id },
			data: body,
		});

		return toAuthorDto(entity);
	}

	async remove(id: string) {
		await this.selectById(id);

		const entity = await this.prisma.author.update({
			where: { id },
			data: { deleted: true },
		});

		return toAuthorDto(entity);
	}
}
