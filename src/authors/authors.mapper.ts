import { AuthorDto } from "./authors.types";

export function toAuthorDto(entity: any): AuthorDto {
	return {
		id: entity.id,
		code: entity.code,
		name: entity.name,
		email: entity.email,
		createdAt: entity.createdAt,
		updatedAt: entity.updatedAt,
	};
}
