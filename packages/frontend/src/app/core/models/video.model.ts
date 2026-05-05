export interface Video {
  id: string;
  code: string;
  title: string;
  description?: string;
  url: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}
export interface CreateVideo {
  title: string;
  description?: string;
  url: string;
  authorId: string;
}
export interface UpdateVideo {
  title?: string;
  description?: string;
  url?: string;
}
export interface FilterVideos {
  search?: string;
  authorId?: string;
  page?: number;
  limit?: number;
}
