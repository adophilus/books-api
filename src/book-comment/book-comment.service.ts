import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateBookCommentDto, UpdateBookCommentDto } from "./dto/book-comment.dto";

@Injectable()
export class BookCommentService {
	constructor(private readonly prisma: PrismaService) {}

	async create(bookId: number, authorId: number, dto: CreateBookCommentDto) {
		return this.prisma.bookComment.create({
			data: {
				book: { connect: { id: bookId } },
				author: { connect: { id: authorId } },
				content: dto.content,
			},
			include: { author: true },
		});
	}

	findByBook(bookId: number) {
		return this.prisma.bookComment.findMany({
			where: { bookId },
			include: { author: true },
		});
	}

	async findOne(id: number) {
		const comment = await this.prisma.bookComment.findUnique({
			where: { id },
			include: { author: true, book: true },
		});
		if (!comment)
			throw new NotFoundException(`BookComment #${id} not found`);
		return comment;
	}

	async update(id: number, authorId: number, dto: UpdateBookCommentDto) {
		const comment = await this.findOne(id);
		if (comment.authorId !== authorId) throw new ForbiddenException();
		return this.prisma.bookComment.update({
			where: { id },
			data: dto,
			include: { author: true },
		});
	}

	async remove(id: number, authorId: number) {
		const comment = await this.findOne(id);
		if (comment.authorId !== authorId) throw new ForbiddenException();
		await this.prisma.bookComment.delete({ where: { id: comment.id } });
		return { deleted: true };
	}
}
