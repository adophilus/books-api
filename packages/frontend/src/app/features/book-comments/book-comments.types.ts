import { BaseModel, BaseResponseInterface } from "@1hand/base.type";

export interface BookComment extends BaseModel {
  code: string;
  bookId: string;
  authorId: string;
  content: string;
}

export interface CreateBookCommentDto {
  bookId: string;
  authorId: string;
  content: string;
}

export interface UpdateBookCommentDto {
  content?: string;
}

export interface FilterBookCommentsDto {
  bookId?: string;
  authorId?: string;
  page?: number;
  limit?: number;
}

export interface BookCommentsResponse extends BaseResponseInterface<BookComment> {}
export const BookCommentsModuleRoot = "book-comments";
