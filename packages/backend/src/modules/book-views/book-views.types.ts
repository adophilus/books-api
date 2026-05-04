import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { Type } from "class-transformer";

export class BookViewDto {
	@ApiProperty()
	id: string;

	@ApiProperty()
	code: string;

	@ApiProperty()
	bookId: string;

	@ApiProperty()
	authorId: string;

	@ApiProperty()
	viewedAt: Date;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	updatedAt: Date;
}

export class CreateBookViewDto {
	@ApiProperty()
	@IsString()
	bookId: string;

	@ApiProperty()
	@IsString()
	authorId: string;
}

export class UpdateBookViewDto {}

export class FilterBookViewDto {
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
