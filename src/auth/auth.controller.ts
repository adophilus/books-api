import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthSignUpDto, AuthSignInDto } from "./dto/auth.dto";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(HttpStatus.CREATED)
	@Post("sign-up")
	signUp(@Body() signUpDto: AuthSignUpDto) {
		return this.authService.signUp(signUpDto);
	}

	@HttpCode(HttpStatus.OK)
	@Post("sign-in")
	signIn(@Body() signInDto: AuthSignInDto) {
		return this.authService.signIn(signInDto);
	}
}
