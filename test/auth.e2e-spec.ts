import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import {
	createTestApp,
	cleanDatabase,
	signup,
	signin,
	signupAndLogin,
} from './helpers/e2e-setup';
import request from 'supertest';

describe('Auth (e2e)', () => {
	let app: INestApplication;
	let prisma: PrismaService;

	beforeAll(async () => {
		app = await createTestApp();
		prisma = app.get(PrismaService);
		await cleanDatabase(prisma);
	});

	afterAll(async () => {
		await cleanDatabase(prisma);
		await app.close();
	});

	describe('POST /auth/sign-up', () => {
		it('should register a new user', () => {
			return signup(app, 'user1@test.com').expect(201);
		});

		it('should reject invalid email', () => {
			return signup(app, 'not-an-email').expect(400);
		});

		it('should reject short password', () => {
			return signup(app, 'short@test.com', 'abc').expect(400);
		});

		it('should reject missing fields', () => {
			return request(app.getHttpServer())
				.post('/auth/sign-up')
				.send({})
				.expect(400);
		});
	});

	describe('POST /auth/sign-in', () => {
		it('should return an access token', async () => {
			const token = await signupAndLogin(app, 'user2@test.com');
			expect(token).toBeDefined();
			expect(typeof token).toBe('string');
		});

		it('should reject wrong password', () => {
			return signin(app, 'user2@test.com', 'wrongpassword').then(
				() => {
					throw new Error('Should have failed');
				},
				(err) => {
					expect(err).toBeDefined();
				},
			);
		});
	});
});
