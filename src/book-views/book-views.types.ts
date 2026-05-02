import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

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
	page?: number;

	@ApiPropertyOptional()
	@IsOptional()
	limit?: number;
}
