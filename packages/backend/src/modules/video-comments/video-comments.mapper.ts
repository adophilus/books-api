import { VideoCommentDto } from "./video-comments.types";

export function toVideoCommentDto(entity: any): VideoCommentDto {
	return {
		id: entity.id,
		code: entity.code,
		videoId: entity.videoId,
		authorId: entity.authorId,
		content: entity.content,
		createdAt: entity.createdAt,
		updatedAt: entity.updatedAt,
	};
}
