import { VideoDto } from "./videos.types";

export function toVideoDto(entity: any): VideoDto {
	return {
		id: entity.id,
		code: entity.code,
		title: entity.title,
		description: entity.description,
		url: entity.url,
		authorId: entity.authorId,
		createdAt: entity.createdAt,
		updatedAt: entity.updatedAt,
	};
}
