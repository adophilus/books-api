import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignUpDto, AuthSignInDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  SignUp(@Body() signUpDto: AuthSignUpDto) {
    return this.authService.signUp(signUpDto)
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  SignIn(@Body() signInDto: AuthSignInDto) {
    return this.authService.signIn(signInDto)
  }
}
