export interface BookView {
  id: string;
  code: string;
  bookId: string;
  authorId: string;
  viewedAt: string;
  createdAt: string;
  updatedAt: string;
}
export interface CreateBookView {
  bookId: string;
  authorId: string;
}
export interface FilterBookViews {
  bookId?: string;
  authorId?: string;
  page?: number;
  limit?: number;
}
