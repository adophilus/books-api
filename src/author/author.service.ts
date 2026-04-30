import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Author } from "./entities/author.entity";
import { Repository } from "typeorm";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { UpdateAuthorDto } from "./dto/update-author.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthorService {
	constructor(
		@InjectRepository(Author)
		private readonly authorRepository: Repository<Author>,
	) {}

	async create(createAuthorDto: CreateAuthorDto) {
		const { password, ...authorData } = createAuthorDto;
		// Note: in a real app, you'd link to an existing User via auth.
		// For now, storing password hash directly on Author for simplicity.
		const author = this.authorRepository.create({
			...authorData,
		});
		return this.authorRepository.save(author);
	}

	findAll() {
		return this.authorRepository.find();
	}

	async findOne(id: number) {
		const author = await this.authorRepository.findOneBy({ id });
		if (!author) throw new NotFoundException(`Author #${id} not found`);
		return author;
	}

	async update(id: number, updateAuthorDto: UpdateAuthorDto) {
		await this.findOne(id);
		await this.authorRepository.update(id, updateAuthorDto);
		return this.findOne(id);
	}

	async remove(id: number) {
		const author = await this.findOne(id);
		await this.authorRepository.remove(author);
		return { deleted: true };
	}

	findBooksByAuthor(authorId: number) {
		return this.authorRepository.findOne({
			where: { id: authorId },
			relations: ["books"],
		}).then((author) => author?.books ?? []);
	}

	findVideosByAuthor(authorId: number) {
		return this.authorRepository.findOne({
			where: { id: authorId },
			relations: ["videos"],
		}).then((author) => author?.videos ?? []);
	}
}
