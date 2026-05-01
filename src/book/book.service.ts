import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateBookDto, UpdateBookDto } from "./dto/book.dto";

@Injectable()
export class BookService {
	constructor(private readonly prisma: PrismaService) {}

	async create(createBookDto: CreateBookDto) {
		return this.prisma.book.create({
			data: {
				title: createBookDto.title,
				description: createBookDto.description,
				author: { connect: { id: createBookDto.author_id } },
			},
			include: { author: true },
		});
	}

	findAll() {
		return this.prisma.book.findMany({ include: { author: true } });
	}

	async findOne(id: number) {
		const book = await this.prisma.book.findUnique({
			where: { id },
			include: { author: true },
		});
		if (!book) throw new NotFoundException(`Book #${id} not found`);
		return book;
	}

	async update(id: number, authorId: number, updateBookDto: UpdateBookDto) {
		const book = await this.findOne(id);
		if (book.authorId !== authorId) throw new ForbiddenException();
		return this.prisma.book.update({
			where: { id },
			data: updateBookDto,
			include: { author: true },
		});
	}

	async remove(id: number, authorId: number) {
		const book = await this.findOne(id);
		if (book.authorId !== authorId) throw new ForbiddenException();
		await this.prisma.book.delete({ where: { id: book.id } });
		return { deleted: true };
	}

	findByAuthor(authorId: number) {
		return this.prisma.book.findMany({
			where: { authorId },
			include: { author: true },
		});
	}
}
