import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

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
	@IsString()
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
	@IsString()
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
	page?: number;

	@ApiPropertyOptional()
	@IsOptional()
	limit?: number;
}
