import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { AuthorsService } from "../authors/authors.service";
import { generateMatricule } from "../@1hand/utils";
import {
	CreateBookDto,
	UpdateBookDto,
	FilterBookDto,
} from "./books.types";
import { toBookDto } from "./books.mapper";

@Injectable()
export class BooksService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly authorsService: AuthorsService,
	) {}

	async create(dto: CreateBookDto) {
		await this.authorsService.selectById(dto.authorId);

		const entity = await this.prisma.book.create({
			data: {
				code: generateMatricule("BOOK"),
				title: dto.title,
				description: dto.description,
				authorId: dto.authorId,
			},
			include: { author: true },
		});

		return toBookDto(entity);
	}

	async selectMany(filter: FilterBookDto) {
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
			this.prisma.book.count({ where }),
			this.prisma.book.findMany({
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
			data: entities.map(toBookDto),
		};
	}

	async selectById(id: string) {
		const entity = await this.prisma.book.findFirst({
			where: { id, deleted: false, archived: false },
			include: { author: true },
		});

		if (!entity) {
			throw new NotFoundException("Book not found");
		}

		return toBookDto(entity);
	}

	async update(id: string, body: UpdateBookDto) {
		await this.selectById(id);

		const entity = await this.prisma.book.update({
			where: { id },
			data: body,
			include: { author: true },
		});

		return toBookDto(entity);
	}

	async remove(id: string) {
		await this.selectById(id);

		const entity = await this.prisma.book.update({
			where: { id },
			data: { deleted: true },
			include: { author: true },
		});

		return toBookDto(entity);
	}
}
