import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateAuthorDto, UpdateAuthorDto } from "./dto/author.dto";

@Injectable()
export class AuthorService {
	constructor(private readonly prisma: PrismaService) {}

	async create(userId: number, createAuthorDto: CreateAuthorDto) {
		const existing = await this.prisma.author.findUnique({
			where: { userId },
		});
		if (existing)
			throw new BadRequestException(
				"Author profile already exists for this user",
			);

		return this.prisma.author.create({
			data: {
				...createAuthorDto,
				user: { connect: { id: userId } },
			},
		});
	}

	findAll() {
		return this.prisma.author.findMany();
	}

	async findOne(id: number) {
		const author = await this.prisma.author.findUnique({ where: { id } });
		if (!author) throw new NotFoundException(`Author #${id} not found`);
		return author;
	}

	async update(id: number, updateAuthorDto: UpdateAuthorDto) {
		await this.findOne(id);
		return this.prisma.author.update({
			where: { id },
			data: updateAuthorDto,
		});
	}

	async remove(id: number) {
		const author = await this.findOne(id);
		await this.prisma.author.delete({ where: { id: author.id } });
		return { deleted: true };
	}

	async findByUserId(userId: number) {
		const author = await this.prisma.author.findUnique({
			where: { userId },
		});
		if (!author)
			throw new NotFoundException(
				"Author profile not found for this user",
			);
		return author;
	}
}
