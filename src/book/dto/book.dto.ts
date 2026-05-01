import { OmitType, PartialType } from "@nestjs/mapped-types";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateBookDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsNotEmpty()
	description: string;

	@IsInt()
	author_id: number;
}

export class UpdateBookDto extends PartialType(
	OmitType(CreateBookDto, ["author_id"]),
) {}
