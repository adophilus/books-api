import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../src/prisma.service';
import {
	createTestApp,
	cleanDatabase,
} from './helpers/e2e-setup';
import request from 'supertest';

describe('Authors (e2e)', () => {
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

	describe('POST /authors', () => {
		it('should create an author', () => {
			return request(app.getHttpServer())
				.post('/authors')
				.send({ name: 'Test Author', email: 'author@test.com' })
				.expect(201)
				.expect((res) => {
					expect(res.body).toHaveProperty('id');
					expect(res.body).toHaveProperty('code');
					expect(res.body.name).toBe('Test Author');
				});
		});

		it('should reject missing fields', () => {
			return request(app.getHttpServer())
				.post('/authors')
				.send({})
				.expect(400);
		});

		it('should reject invalid email', () => {
			return request(app.getHttpServer())
				.post('/authors')
				.send({ name: 'Bad', email: 'not-an-email' })
				.expect(400);
		});
	});

	describe('GET /authors', () => {
		it('should return paginated authors', () => {
			return request(app.getHttpServer())
				.get('/authors')
				.expect(200)
				.expect((res) => {
					expect(res.body).toHaveProperty('page');
					expect(res.body).toHaveProperty('limit');
					expect(res.body).toHaveProperty('total');
					expect(res.body.data).toBeInstanceOf(Array);
				});
		});
	});

	describe('GET /authors/:id', () => {
		let authorId: string;

		beforeAll(async () => {
			const res = await request(app.getHttpServer())
				.post('/authors')
				.send({ name: 'Find Me', email: 'find@test.com' });
			authorId = res.body.id;
		});

		it('should return one author', () => {
			return request(app.getHttpServer())
				.get(`/authors/${authorId}`)
				.expect(200)
				.expect((res) => {
					expect(res.body.name).toBe('Find Me');
				});
		});

		it('should return 404 for non-existent author', () => {
			return request(app.getHttpServer())
				.get('/authors/00000000-0000-0000-0000-000000000000')
				.expect(404);
		});
	});

	describe('PUT /authors/:id', () => {
		let authorId: string;

		beforeAll(async () => {
			const res = await request(app.getHttpServer())
				.post('/authors')
				.send({ name: 'Update Me', email: 'update@test.com' });
			authorId = res.body.id;
		});

		it('should update an author', () => {
			return request(app.getHttpServer())
				.put(`/authors/${authorId}`)
				.send({ name: 'Updated Author' })
				.expect(200)
				.expect((res) => {
					expect(res.body.name).toBe('Updated Author');
				});
		});
	});

	describe('DELETE /authors/:id (soft delete)', () => {
		let authorId: string;

		beforeAll(async () => {
			const res = await request(app.getHttpServer())
				.post('/authors')
				.send({ name: 'Delete Me', email: 'delete@test.com' });
			authorId = res.body.id;
		});

		it('should soft delete an author', () => {
			return request(app.getHttpServer())
				.delete(`/authors/${authorId}`)
				.expect(200)
				.expect((res) => {
					expect(res.body.id).toBe(authorId);
				});
		});

		it('should return 404 after soft delete', () => {
			return request(app.getHttpServer())
				.get(`/authors/${authorId}`)
				.expect(404);
		});
	});
});
