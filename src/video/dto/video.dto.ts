import { OmitType, PartialType } from "@nestjs/mapped-types";
import { IsInt, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateVideoDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsNotEmpty()
	description: string;

	@IsUrl()
	@IsNotEmpty()
	url: string;

	@IsInt()
	author_id: number;
}

export class UpdateVideoDto extends PartialType(
	OmitType(CreateVideoDto, ["author_id"]),
) {}
