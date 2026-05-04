import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, IsUrl, Max, Min } from "class-validator";
import { Type } from "class-transformer";

export class VideoDto {
	@ApiProperty()
	id: string;

	@ApiProperty()
	code: string;

	@ApiProperty()
	title: string;

	@ApiPropertyOptional()
	description?: string;

	@ApiProperty()
	url: string;

	@ApiProperty()
	authorId: string;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	updatedAt: Date;
}

export class CreateVideoDto {
	@ApiProperty()
	@IsString()
	title: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	description?: string;

	@ApiProperty()
	@IsUrl()
	url: string;

	@ApiProperty()
	@IsString()
	authorId: string;
}

export class UpdateVideoDto {
	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	title?: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	description?: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsUrl()
	url?: string;
}

export class FilterVideoDto {
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
