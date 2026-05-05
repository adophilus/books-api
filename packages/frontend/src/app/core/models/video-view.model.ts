export interface VideoView {
  id: string;
  code: string;
  videoId: string;
  authorId: string;
  viewedAt: string;
  createdAt: string;
  updatedAt: string;
}
export interface CreateVideoView {
  videoId: string;
  authorId: string;
}
export interface FilterVideoViews {
  videoId?: string;
  authorId?: string;
  page?: number;
  limit?: number;
}
