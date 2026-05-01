import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAuthorDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsEmail()
	email: string;
}

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {}
