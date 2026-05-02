import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class BookDto {
	@ApiProperty()
	id: string;

	@ApiProperty()
	code: string;

	@ApiProperty()
	title: string;

	@ApiPropertyOptional()
	description?: string;

	@ApiProperty()
	authorId: string;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	updatedAt: Date;
}

export class CreateBookDto {
	@ApiProperty()
	@IsString()
	title: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	description?: string;

	@ApiProperty()
	@IsString()
	authorId: string;
}

export class UpdateBookDto {
	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	title?: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	description?: string;
}

export class FilterBookDto {
	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	search?: string;

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
