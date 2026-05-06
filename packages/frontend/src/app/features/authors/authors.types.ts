import { BaseModel, BaseResponseInterface } from "@1hand/base.type";

export interface Author extends BaseModel {
  code: string;
  name: string;
  email: string;
  bio: string;
}

export interface CreateAuthorDto {
  name: string;
  email: string;
  bio?: string;
}

export interface UpdateAuthorDto {
  name?: string;
  email?: string;
  bio?: string;
}

export interface FilterAuthorDto {
  search?: string;
  page?: number;
  limit?: number;
}

export interface AuthorsResponse extends BaseResponseInterface<Author> {}

export const AuthorsModuleRoot = "authors";
