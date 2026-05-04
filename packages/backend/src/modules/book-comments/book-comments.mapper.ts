import { BookCommentDto } from "./book-comments.types";

export function toBookCommentDto(entity: any): BookCommentDto {
	return {
		id: entity.id,
		code: entity.code,
		bookId: entity.bookId,
		authorId: entity.authorId,
		content: entity.content,
		createdAt: entity.createdAt,
		updatedAt: entity.updatedAt,
	};
}
