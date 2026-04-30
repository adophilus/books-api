import { IsInt, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateVideoDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsNotEmpty()
	description: string;

	@IsUrl()
	@IsNotEmpty()
	url: string;

	@IsInt()
	author_id: number;
}

export class UpdateVideoDto {
	@IsString()
	@IsOptional()
	title?: string;

	@IsString()
	@IsOptional()
	description?: string;

	@IsUrl()
	@IsOptional()
	url?: string;
}
