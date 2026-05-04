import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../src/prisma.service';
import {
	createTestApp,
	cleanDatabase,
} from './helpers/e2e-setup';
import request from 'supertest';

describe('Books (e2e)', () => {
	let app: INestApplication;
	let prisma: PrismaService;
	let authorId: string;
	let bookId: string;

	beforeAll(async () => {
		app = await createTestApp();
		prisma = app.get(PrismaService);
		await cleanDatabase(prisma);

		const authorRes = await request(app.getHttpServer())
			.post('/authors')
			.send({ name: 'Book Author', email: 'bookauthor@test.com' });
		authorId = authorRes.body.id;
	});

	afterAll(async () => {
		await cleanDatabase(prisma);
		await app.close();
	});

	describe('POST /books', () => {
		it('should create a book', () => {
			return request(app.getHttpServer())
				.post('/books')
				.send({ title: 'Test Book', description: 'A test', authorId })
				.expect(201)
				.expect((res) => {
					bookId = res.body.id;
					expect(res.body).toHaveProperty('code');
					expect(res.body.title).toBe('Test Book');
					expect(res.body.authorId).toBe(authorId);
				});
		});

		it('should reject missing fields', () => {
			return request(app.getHttpServer())
				.post('/books')
				.send({})
				.expect(400);
		});

		it('should reject invalid authorId', () => {
			return request(app.getHttpServer())
				.post('/books')
				.send({ title: 'Bad', authorId: 'non-existent-id' })
				.expect(404);
		});
	});

	describe('GET /books', () => {
		it('should return paginated books', () => {
			return request(app.getHttpServer())
				.get('/books')
				.expect(200)
				.expect((res) => {
					expect(res.body).toHaveProperty('data');
					expect(res.body.data.length).toBeGreaterThan(0);
				});
		});

		it('should filter by authorId', () => {
			return request(app.getHttpServer())
				.get(`/books?authorId=${authorId}`)
				.expect(200)
				.expect((res) => {
					expect(res.body.data.length).toBeGreaterThan(0);
				});
		});
	});

	describe('GET /books/:id', () => {
		it('should return one book', () => {
			return request(app.getHttpServer())
				.get(`/books/${bookId}`)
				.expect(200)
				.expect((res) => {
					expect(res.body.title).toBe('Test Book');
				});
		});

		it('should return 404 for non-existent', () => {
			return request(app.getHttpServer())
				.get('/books/00000000-0000-0000-0000-000000000000')
				.expect(404);
		});
	});

	describe('PUT /books/:id', () => {
		it('should update a book', () => {
			return request(app.getHttpServer())
				.put(`/books/${bookId}`)
				.send({ title: 'Updated Book' })
				.expect(200)
				.expect((res) => {
					expect(res.body.title).toBe('Updated Book');
				});
		});
	});

	describe('DELETE /books/:id', () => {
		it('should soft delete a book', () => {
			return request(app.getHttpServer())
				.delete(`/books/${bookId}`)
				.expect(200);
		});

		it('should return 404 after deletion', () => {
			return request(app.getHttpServer())
				.get(`/books/${bookId}`)
				.expect(404);
		});
	});
});
