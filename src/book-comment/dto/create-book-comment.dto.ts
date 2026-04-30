import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBookCommentDto {
	@IsInt()
	author_id: number;

	@IsString()
	@IsNotEmpty()
	content: string;
}

export class UpdateBookCommentDto {
	@IsString()
	@IsOptional()
	content?: string;
}
