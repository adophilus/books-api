import { OmitType, PartialType } from "@nestjs/mapped-types";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateVideoCommentDto {
	@IsInt()
	author_id: number;

	@IsString()
	@IsNotEmpty()
	content: string;
}

export class UpdateVideoCommentDto extends PartialType(
	OmitType(CreateVideoCommentDto, ["author_id"]),
) {}
