import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { Type } from "class-transformer";

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
