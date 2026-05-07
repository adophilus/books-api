import { BaseModel, BaseResponseInterface } from "@1hand/base.type";

export interface VideoView extends BaseModel {
  code: string;
  videoId: string;
  authorId: string;
  viewedAt: string;
}

export interface CreateVideoViewDto {
  videoId: string;
  authorId: string;
}

export interface FilterVideoViewsDto {
  videoId?: string;
  authorId?: string;
  page?: number;
  limit?: number;
}

export interface VideoViewsResponse extends BaseResponseInterface<VideoView> {}
export const VideoViewsModuleRoot = "video-views";
