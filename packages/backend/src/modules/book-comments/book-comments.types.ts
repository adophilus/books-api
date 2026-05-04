import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { Type } from "class-transformer";

export class BookCommentDto {
	@ApiProperty()
	id: string;

	@ApiProperty()
	code: string;

	@ApiProperty()
	bookId: string;

	@ApiProperty()
	authorId: string;

	@ApiProperty()
	content: string;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	updatedAt: Date;
}

export class CreateBookCommentDto {
	@ApiProperty()
	@IsString()
	bookId: string;

	@ApiProperty()
	@IsString()
	authorId: string;

	@ApiProperty()
	@IsString()
	content: string;
}

export class UpdateBookCommentDto {
	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	content?: string;
}

export class FilterBookCommentDto {
	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	bookId?: string;

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
