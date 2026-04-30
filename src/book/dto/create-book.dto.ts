import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBookDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsNotEmpty()
	description: string;

	@IsInt()
	author_id: number;
}

export class UpdateBookDto {
	@IsString()
	@IsOptional()
	title?: string;

	@IsString()
	@IsOptional()
	description?: string;
}
