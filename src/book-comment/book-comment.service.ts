import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BookComment } from "./entities/book-comment.entity";
import { Repository } from "typeorm";
import { CreateBookCommentDto, UpdateBookCommentDto } from "./dto/create-book-comment.dto";

@Injectable()
export class BookCommentService {
	constructor(
		@InjectRepository(BookComment)
		private readonly bookCommentRepository: Repository<BookComment>,
	) {}

	async create(bookId: number, createBookCommentDto: CreateBookCommentDto) {
		const comment = this.bookCommentRepository.create({
			book: { id: bookId },
			author: { id: createBookCommentDto.author_id },
			content: createBookCommentDto.content,
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

	async update(id: number, updateBookCommentDto: UpdateBookCommentDto) {
		await this.findOne(id);
		await this.bookCommentRepository.update(id, updateBookCommentDto);
		return this.findOne(id);
	}

	async remove(id: number) {
		const comment = await this.findOne(id);
		await this.bookCommentRepository.remove(comment);
		return { deleted: true };
	}
}
