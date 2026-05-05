export interface BookComment {
  id: string;
  code: string;
  bookId: string;
  authorId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
export interface CreateBookComment {
  bookId: string;
  authorId: string;
  content: string;
}
export interface UpdateBookComment {
  content?: string;
}
export interface FilterBookComments {
  bookId?: string;
  authorId?: string;
  page?: number;
  limit?: number;
}
