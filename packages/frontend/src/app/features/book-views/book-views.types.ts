import { BaseModel, BaseResponseInterface } from "@1hand/base.type";

export interface BookView extends BaseModel {
  code: string;
  bookId: string;
  authorId: string;
  viewedAt: string;
}

export interface CreateBookViewDto {
  bookId: string;
  authorId: string;
}

export interface FilterBookViewsDto {
  bookId?: string;
  authorId?: string;
  page?: number;
  limit?: number;
}

export interface BookViewsResponse extends BaseResponseInterface<BookView> {}
export const BookViewsModuleRoot = "book-views";
