import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Book } from "./entities/book.entity";
import { Repository } from "typeorm";
import { CreateBookDto, UpdateBookDto } from "./dto/book.dto";

@Injectable()
export class BookService {
	constructor(
		@InjectRepository(Book)
		private readonly bookRepository: Repository<Book>,
	) {}

	async create(createBookDto: CreateBookDto) {
		const book = this.bookRepository.create({
			title: createBookDto.title,
			description: createBookDto.description,
			author: { id: createBookDto.author_id },
		});
		return this.bookRepository.save(book);
	}

	findAll() {
		return this.bookRepository.find({ relations: ["author"] });
	}

	async findOne(id: number) {
		const book = await this.bookRepository.findOne({
			where: { id },
			relations: ["author"],
		});
		if (!book) throw new NotFoundException(`Book #${id} not found`);
		return book;
	}

	async update(id: number, updateBookDto: UpdateBookDto) {
		await this.findOne(id);
		await this.bookRepository.update(id, updateBookDto);
		return this.findOne(id);
	}

	async remove(id: number) {
		const book = await this.findOne(id);
		await this.bookRepository.remove(book);
		return { deleted: true };
	}

	findByAuthor(authorId: number) {
		return this.bookRepository.find({
			where: { author: { id: authorId } },
			relations: ["author"],
		});
	}
}
