import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBookCommentDto {
	@IsString()
	@IsNotEmpty()
	content: string;
}

export class UpdateBookCommentDto extends PartialType(CreateBookCommentDto) {}
