import { BookDto } from "./books.types";

export function toBookDto(entity: any): BookDto {
	return {
		id: entity.id,
		code: entity.code,
		title: entity.title,
		description: entity.description,
		authorId: entity.authorId,
		createdAt: entity.createdAt,
		updatedAt: entity.updatedAt,
	};
}
