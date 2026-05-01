import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAuthorDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsEmail()
	email: string;
}
