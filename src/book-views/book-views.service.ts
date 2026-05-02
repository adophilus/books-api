import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { AuthorsService } from "../authors/authors.service";
import { BooksService } from "../books/books.service";
import { generateMatricule } from "../utils";
import {
	CreateBookViewDto,
	UpdateBookViewDto,
	FilterBookViewDto,
} from "./book-views.types";
import { toBookViewDto } from "./book-views.mapper";

@Injectable()
export class BookViewsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly authorsService: AuthorsService,
		private readonly booksService: BooksService,
	) {}

	async create(dto: CreateBookViewDto) {
		await this.booksService.selectById(dto.bookId);
		await this.authorsService.selectById(dto.authorId);

		const entity = await this.prisma.bookView.create({
			data: {
				code: generateMatricule("BKVS"),
				bookId: dto.bookId,
				authorId: dto.authorId,
			},
		});

		return toBookViewDto(entity);
	}

	async selectMany(filter: FilterBookViewDto) {
		const page = Math.max(1, Number(filter.page) || 1);
		const limit = Math.max(1, Number(filter.limit) || 10);

		const where: any = {
			deleted: false,
			archived: false,
		};

		if (filter.bookId) where.bookId = filter.bookId;
		if (filter.authorId) where.authorId = filter.authorId;

		const [total, entities] = await this.prisma.$transaction([
			this.prisma.bookView.count({ where }),
			this.prisma.bookView.findMany({
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
			data: entities.map(toBookViewDto),
		};
	}

	async selectById(id: string) {
		const entity = await this.prisma.bookView.findFirst({
			where: { id, deleted: false, archived: false },
		});

		if (!entity) {
			throw new NotFoundException("Book view not found");
		}

		return toBookViewDto(entity);
	}

	async update(id: string, body: UpdateBookViewDto) {
		await this.selectById(id);

		const entity = await this.prisma.bookView.update({
			where: { id },
			data: body,
		});

		return toBookViewDto(entity);
	}

	async remove(id: string) {
		await this.selectById(id);

		const entity = await this.prisma.bookView.update({
			where: { id },
			data: { deleted: true },
		});

		return toBookViewDto(entity);
	}
}
