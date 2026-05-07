import { BaseModel, BaseResponseInterface } from "@1hand/base.type";

export interface Book extends BaseModel {
  code: string;
  title: string;
  description?: string;
  authorId: string;
}

export interface CreateBookDto {
  title: string;
  description?: string;
  authorId: string;
}

export interface UpdateBookDto {
  title?: string;
  description?: string;
}

export interface FilterBookDto {
  search?: string;
  authorId?: string;
  page?: number;
  limit?: number;
}

export interface BooksResponse extends BaseResponseInterface<Book> {}
export const BooksModuleRoot = "books";
