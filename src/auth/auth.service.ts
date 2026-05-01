import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { AuthSignUpDto, AuthSignInDto, AuthSignInResponseDto } from "./auth.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async signUp(payload: AuthSignUpDto): Promise<void> {
		const hashedPassword = await bcrypt.hash(payload.password, 10);
		await this.usersService.create({
			email: payload.email,
			password: hashedPassword,
		});
	}

	async signIn(
		payload: AuthSignInDto,
	): Promise<AuthSignInResponseDto> {
		const user = await this.usersService.findByEmail(payload.email);

		if (!user || !(await bcrypt.compare(payload.password, user.password)))
			throw new UnauthorizedException();

		const accessToken = await this.jwtService.signAsync({ sub: user.id });

		return { accessToken };
	}
}
