import { VideoViewDto } from "./video-views.types";

export function toVideoViewDto(entity: any): VideoViewDto {
	return {
		id: entity.id,
		code: entity.code,
		videoId: entity.videoId,
		authorId: entity.authorId,
		viewedAt: entity.viewedAt,
		createdAt: entity.createdAt,
		updatedAt: entity.updatedAt,
	};
}
