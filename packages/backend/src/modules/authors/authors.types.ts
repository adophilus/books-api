import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { Type } from "class-transformer";

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
	@IsEmail()
	email: string;
}

export class UpdateAuthorDto {
	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	name?: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsEmail()
	email?: string;
}

export class FilterAuthorDto {
	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	search?: string;

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
