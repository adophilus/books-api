export class AuthSignUpDto {
	email: string;
	password: string;
}

export class AuthSignInDto extends AuthSignUpDto {}
