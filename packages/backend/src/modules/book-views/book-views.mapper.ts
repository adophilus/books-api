import { BookViewDto } from "./book-views.types";

export function toBookViewDto(entity: any): BookViewDto {
	return {
		id: entity.id,
		code: entity.code,
		bookId: entity.bookId,
		authorId: entity.authorId,
		viewedAt: entity.viewedAt,
		createdAt: entity.createdAt,
		updatedAt: entity.updatedAt,
	};
}
