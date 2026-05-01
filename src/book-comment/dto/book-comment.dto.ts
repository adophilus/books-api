import { OmitType, PartialType } from "@nestjs/mapped-types";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateBookCommentDto {
	@IsInt()
	author_id: number;

	@IsString()
	@IsNotEmpty()
	content: string;
}

export class UpdateBookCommentDto extends PartialType(
	OmitType(CreateBookCommentDto, ["author_id"]),
) {}
