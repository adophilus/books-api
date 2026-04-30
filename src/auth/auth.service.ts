import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import {
	AuthServiceSignInPayload,
	AuthServiceSignInResponse,
	AuthServiceSignUpPayload,
} from "./auth.type";

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async signUp(payload: AuthServiceSignUpPayload): Promise<void> {
		await this.usersService.create(payload);
	}

	async signIn(
		payload: AuthServiceSignInPayload,
	): Promise<AuthServiceSignInResponse> {
		const user = await this.usersService.findByEmail(payload.email);

		if (!user || user.password !== payload.password)
			throw new UnauthorizedException();

		const accessToken = await this.jwtService.signAsync({ email: user.email });

		return {
			accessToken,
		};
	}
}
