import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

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
	page?: number;

	@ApiPropertyOptional()
	@IsOptional()
	limit?: number;
}
