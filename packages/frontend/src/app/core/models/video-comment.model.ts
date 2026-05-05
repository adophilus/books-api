export interface VideoComment {
  id: string;
  code: string;
  videoId: string;
  authorId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
export interface CreateVideoComment {
  videoId: string;
  authorId: string;
  content: string;
}
export interface UpdateVideoComment {
  content?: string;
}
export interface FilterVideoComments {
  videoId?: string;
  authorId?: string;
  page?: number;
  limit?: number;
}
