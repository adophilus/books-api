import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { AuthorsService } from "../authors/authors.service";
import { BooksService } from "../books/books.service";
import { generateMatricule } from "../utils";
import {
	CreateBookCommentDto,
	UpdateBookCommentDto,
	FilterBookCommentDto,
} from "./book-comments.types";
import { toBookCommentDto } from "./book-comments.mapper";

@Injectable()
export class BookCommentsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly authorsService: AuthorsService,
		private readonly booksService: BooksService,
	) {}

	async create(dto: CreateBookCommentDto) {
		await this.booksService.selectById(dto.bookId);
		await this.authorsService.selectById(dto.authorId);

		const entity = await this.prisma.bookComment.create({
			data: {
				code: generateMatricule("BKCM"),
				bookId: dto.bookId,
				authorId: dto.authorId,
				content: dto.content,
			},
		});

		return toBookCommentDto(entity);
	}

	async selectMany(filter: FilterBookCommentDto) {
		const page = Math.max(1, Number(filter.page) || 1);
		const limit = Math.max(1, Number(filter.limit) || 10);

		const where: any = {
			deleted: false,
			archived: false,
		};

		if (filter.bookId) where.bookId = filter.bookId;
		if (filter.authorId) where.authorId = filter.authorId;

		const [total, entities] = await this.prisma.$transaction([
			this.prisma.bookComment.count({ where }),
			this.prisma.bookComment.findMany({
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
			data: entities.map(toBookCommentDto),
		};
	}

	async selectById(id: string) {
		const entity = await this.prisma.bookComment.findFirst({
			where: { id, deleted: false, archived: false },
		});

		if (!entity) {
			throw new NotFoundException("Book comment not found");
		}

		return toBookCommentDto(entity);
	}

	async update(id: string, body: UpdateBookCommentDto) {
		await this.selectById(id);

		const entity = await this.prisma.bookComment.update({
			where: { id },
			data: body,
		});

		return toBookCommentDto(entity);
	}

	async remove(id: string) {
		await this.selectById(id);

		const entity = await this.prisma.bookComment.update({
			where: { id },
			data: { deleted: true },
		});

		return toBookCommentDto(entity);
	}
}
