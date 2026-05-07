import { BaseModel, BaseResponseInterface } from "@1hand/base.type";

export interface VideoComment extends BaseModel {
  code: string;
  videoId: string;
  authorId: string;
  content: string;
}

export interface CreateVideoCommentDto {
  videoId: string;
  authorId: string;
  content: string;
}

export interface UpdateVideoCommentDto {
  content?: string;
}

export interface FilterVideoCommentsDto {
  videoId?: string;
  authorId?: string;
  page?: number;
  limit?: number;
}

export interface VideoCommentsResponse extends BaseResponseInterface<VideoComment> {}
export const VideoCommentsModuleRoot = "video-comments";
