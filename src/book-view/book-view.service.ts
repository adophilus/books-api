import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class BookViewService {
	constructor(private readonly prisma: PrismaService) {}

	async create(bookId: number, authorId: number) {
		return this.prisma.bookView.create({
			data: {
				book: { connect: { id: bookId } },
				author: { connect: { id: authorId } },
			},
			include: { author: true },
		});
	}

	findByBook(bookId: number) {
		return this.prisma.bookView.findMany({
			where: { bookId },
			include: { author: true },
		});
	}

	findByAuthor(authorId: number) {
		return this.prisma.bookView.findMany({
			where: { authorId },
			include: { book: { include: { author: true } } },
		});
	}

	async findOne(id: number) {
		const view = await this.prisma.bookView.findUnique({
			where: { id },
			include: { author: true, book: true },
		});
		if (!view) throw new NotFoundException(`BookView #${id} not found`);
		return view;
	}

	async remove(id: number, authorId: number) {
		const view = await this.findOne(id);
		if (view.authorId !== authorId) throw new ForbiddenException();
		await this.prisma.bookView.delete({ where: { id: view.id } });
		return { deleted: true };
	}
}
