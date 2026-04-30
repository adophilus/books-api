import { IsEmail, IsString, MinLength } from "class-validator";

export class AuthSignUpDto {
	@IsEmail()
	email: string;

	@IsString()
	@MinLength(8)
	password: string;
}

export class AuthSignInDto {
	@IsEmail()
	email: string;

	@IsString()
	password: string;
}
