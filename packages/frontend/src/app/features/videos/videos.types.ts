import { BaseModel, BaseResponseInterface } from "@1hand/base.type";

export interface Video extends BaseModel {
  code: string;
  title: string;
  description?: string;
  url: string;
  authorId: string;
}

export interface CreateVideoDto {
  title: string;
  description?: string;
  url: string;
  authorId: string;
}

export interface UpdateVideoDto {
  title?: string;
  description?: string;
  url?: string;
}

export interface FilterVideoDto {
  search?: string;
  authorId?: string;
  page?: number;
  limit?: number;
}

export interface VideosResponse extends BaseResponseInterface<Video> {}
export const VideosModuleRoot = "videos";
