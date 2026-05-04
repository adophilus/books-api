import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { Type } from "class-transformer";

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
	@Type(() => Number)
	@IsNumber()
	@Min(1)
	page?: number;

	@ApiPropertyOptional()
	@IsOptional()
	@Type(() => Number)
	@IsNumber()
	@Min(1)
	@Max(100)
	limit?: number;
}
