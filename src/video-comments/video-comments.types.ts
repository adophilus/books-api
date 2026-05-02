import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class VideoCommentDto {
	@ApiProperty()
	id: string;

	@ApiProperty()
	code: string;

	@ApiProperty()
	videoId: string;

	@ApiProperty()
	authorId: string;

	@ApiProperty()
	content: string;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	updatedAt: Date;
}

export class CreateVideoCommentDto {
	@ApiProperty()
	@IsString()
	videoId: string;

	@ApiProperty()
	@IsString()
	authorId: string;

	@ApiProperty()
	@IsString()
	content: string;
}

export class UpdateVideoCommentDto {
	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	content?: string;
}

export class FilterVideoCommentDto {
	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	videoId?: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	authorId?: string;

	@ApiPropertyOptional()
	@IsOptional()
	page?: number;

	@ApiPropertyOptional()
	@IsOptional()
	limit?: number;
}
