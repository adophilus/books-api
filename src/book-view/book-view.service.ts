import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BookView } from "./entities/book-view.entity";
import { Repository } from "typeorm";
import { CreateBookViewDto } from "./dto/create-book-view.dto";

@Injectable()
export class BookViewService {
	constructor(
		@InjectRepository(BookView)
		private readonly bookViewRepository: Repository<BookView>,
	) {}

	async create(bookId: number, createBookViewDto: CreateBookViewDto) {
		const view = this.bookViewRepository.create({
			book: { id: bookId },
			author: { id: createBookViewDto.author_id },
		});
		return this.bookViewRepository.save(view);
	}

	findByBook(bookId: number) {
		return this.bookViewRepository.find({
			where: { book: { id: bookId } },
			relations: ["author"],
		});
	}

	findByAuthor(authorId: number) {
		return this.bookViewRepository.find({
			where: { author: { id: authorId } },
			relations: ["book", "book.author"],
		});
	}

	async findOne(id: number) {
		const view = await this.bookViewRepository.findOne({
			where: { id },
			relations: ["author", "book"],
		});
		if (!view) throw new NotFoundException(`BookView #${id} not found`);
		return view;
	}

	async remove(id: number) {
		const view = await this.findOne(id);
		await this.bookViewRepository.remove(view);
		return { deleted: true };
	}
}
