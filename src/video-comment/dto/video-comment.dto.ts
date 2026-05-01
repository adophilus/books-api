import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateVideoCommentDto {
	@IsString()
	@IsNotEmpty()
	content: string;
}

export class UpdateVideoCommentDto extends PartialType(CreateVideoCommentDto) {}
