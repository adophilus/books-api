export interface Book {
  id: string;
  code: string;
  title: string;
  description?: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}
export interface CreateBook {
  title: string;
  description?: string;
  authorId: string;
}
export interface UpdateBook {
  title?: string;
  description?: string;
}
export interface FilterBooks {
  search?: string;
  authorId?: string;
  page?: number;
  limit?: number;
}
