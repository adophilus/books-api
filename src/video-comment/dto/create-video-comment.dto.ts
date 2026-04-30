import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateVideoCommentDto {
	@IsInt()
	author_id: number;

	@IsString()
	@IsNotEmpty()
	content: string;
}

export class UpdateVideoCommentDto {
	@IsString()
	@IsOptional()
	content?: string;
}
