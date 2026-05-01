import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BookComment } from "./entities/book-comment.entity";
import { Repository } from "typeorm";
import { CreateBookCommentDto, UpdateBookCommentDto } from "./dto/book-comment.dto";

@Injectable()
export class BookCommentService {
	constructor(
		@InjectRepository(BookComment)
		private readonly bookCommentRepository: Repository<BookComment>,
	) {}

	async create(bookId: number, authorId: number, dto: CreateBookCommentDto) {
		const comment = this.bookCommentRepository.create({
			book: { id: bookId },
			author: { id: authorId },
			content: dto.content,
		});
		return this.bookCommentRepository.save(comment);
	}

	findByBook(bookId: number) {
		return this.bookCommentRepository.find({
			where: { book: { id: bookId } },
			relations: ["author"],
		});
	}

	async findOne(id: number) {
		const comment = await this.bookCommentRepository.findOne({
			where: { id },
			relations: ["author", "book"],
		});
		if (!comment)
			throw new NotFoundException(`BookComment #${id} not found`);
		return comment;
	}

	async update(id: number, authorId: number, dto: UpdateBookCommentDto) {
		const comment = await this.findOne(id);
		if (comment.author.id !== authorId) throw new ForbiddenException();
		await this.bookCommentRepository.update(id, dto);
		return this.findOne(id);
	}

	async remove(id: number, authorId: number) {
		const comment = await this.findOne(id);
		if (comment.author.id !== authorId) throw new ForbiddenException();
		await this.bookCommentRepository.remove(comment);
		return { deleted: true };
	}
}
