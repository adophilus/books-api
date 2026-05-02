import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class AuthorDto {
	@ApiProperty()
	id: string;

	@ApiProperty()
	code: string;

	@ApiProperty()
	name: string;

	@ApiProperty()
	email: string;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	updatedAt: Date;
}

export class CreateAuthorDto {
	@ApiProperty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsString()
	email: string;
}

export class UpdateAuthorDto {
	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	name?: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	email?: string;
}

export class FilterAuthorDto {
	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	search?: string;

	@ApiPropertyOptional()
	@IsOptional()
	page?: number;

	@ApiPropertyOptional()
	@IsOptional()
	limit?: number;
}
