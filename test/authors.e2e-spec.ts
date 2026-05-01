import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import {
	createTestApp,
	cleanDatabase,
	signupAndLogin,
	createTestAuthor,
} from './helpers/e2e-setup';
import request from 'supertest';

describe('Authors (e2e)', () => {
	let app: INestApplication;
	let prisma: PrismaService;
	let token: string;
	let author: any;

	beforeAll(async () => {
		app = await createTestApp();
		prisma = app.get(PrismaService);
		await cleanDatabase(prisma);

		token = await signupAndLogin(app, 'author@test.com');
		author = await createTestAuthor(app, token, 'Test Author', 'author@test.com');
	});

	afterAll(async () => {
		await cleanDatabase(prisma);
		await app.close();
	});

	describe('POST /authors', () => {
		it('should create an author profile', () => {
			expect(author).toHaveProperty('id');
			expect(author.name).toBe('Test Author');
			expect(author.email).toBe('author@test.com');
		});

		it('should require authentication', () => {
			return request(app.getHttpServer())
				.post('/authors')
				.send({ name: 'No Auth', email: 'noauth@test.com' })
				.expect(401);
		});

		it('should reject duplicate profile for same user', () => {
			return request(app.getHttpServer())
				.post('/authors')
				.set('Authorization', `Bearer ${token}`)
				.send({ name: 'Duplicate', email: 'dup@test.com' })
				.expect(400);
		});

		it('should reject invalid input', () => {
			return request(app.getHttpServer())
				.post('/authors')
				.set('Authorization', `Bearer ${token}`)
				.send({})
				.expect(400);
		});
	});

	describe('GET /authors', () => {
		it('should return all authors', () => {
			return request(app.getHttpServer())
				.get('/authors')
				.expect(200)
				.expect((res) => {
					expect(res.body).toBeInstanceOf(Array);
					expect(res.body.length).toBeGreaterThan(0);
				});
		});
	});

	describe('GET /authors/:id', () => {
		it('should return one author', () => {
			return request(app.getHttpServer())
				.get(`/authors/${author.id}`)
				.expect(200)
				.expect((res) => {
					expect(res.body.name).toBe('Test Author');
				});
		});

		it('should return 404 for non-existent author', () => {
			return request(app.getHttpServer())
				.get('/authors/999999')
				.expect(404);
		});
	});

	describe('PUT /authors/:id', () => {
		it('should update an author', () => {
			return request(app.getHttpServer())
				.put(`/authors/${author.id}`)
				.send({ name: 'Updated Author' })
				.expect(200)
				.expect((res) => {
					expect(res.body.name).toBe('Updated Author');
				});
		});
	});

	describe('DELETE /authors/:id', () => {
		it('should delete an author', () => {
			return request(app.getHttpServer())
				.delete(`/authors/${author.id}`)
				.expect(200)
				.expect((res) => {
					expect(res.body.deleted).toBe(true);
				});
		});

		it('should return 404 after deletion', () => {
			return request(app.getHttpServer())
				.get(`/authors/${author.id}`)
				.expect(404);
		});
	});
});
