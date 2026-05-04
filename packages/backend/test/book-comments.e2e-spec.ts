import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../src/prisma.service';
import {
	createTestApp,
	cleanDatabase,
} from './helpers/e2e-setup';
import request from 'supertest';

describe('Book Comments (e2e)', () => {
	let app: INestApplication;
	let prisma: PrismaService;
	let authorId: string;
	let bookId: string;
	let commentId: string;

	beforeAll(async () => {
		app = await createTestApp();
		prisma = app.get(PrismaService);
		await cleanDatabase(prisma);

		const authorRes = await request(app.getHttpServer())
			.post('/authors')
			.send({ name: 'BC Author', email: 'bcauthor@test.com' });
		authorId = authorRes.body.id;

		const bookRes = await request(app.getHttpServer())
			.post('/books')
			.send({ title: 'BC Book', authorId });
		bookId = bookRes.body.id;
	});

	afterAll(async () => {
		await cleanDatabase(prisma);
		await app.close();
	});

	describe('POST /book-comments', () => {
		it('should create a comment', () => {
			return request(app.getHttpServer())
				.post('/book-comments')
				.send({ bookId, authorId, content: 'Great book!' })
				.expect(201)
				.expect((res) => {
					commentId = res.body.id;
					expect(res.body.content).toBe('Great book!');
				});
		});

		it('should reject empty content', () => {
			return request(app.getHttpServer())
				.post('/book-comments')
				.send({ bookId, authorId, content: '' })
				.expect(400);
		});
	});

	describe('GET /book-comments', () => {
		it('should return paginated comments', () => {
			return request(app.getHttpServer())
				.get('/book-comments')
				.expect(200)
				.expect((res) => {
					expect(res.body.data.length).toBeGreaterThan(0);
				});
		});

		it('should filter by bookId', () => {
			return request(app.getHttpServer())
				.get(`/book-comments?bookId=${bookId}`)
				.expect(200)
				.expect((res) => {
					expect(res.body.data.length).toBeGreaterThan(0);
				});
		});
	});

	describe('GET /book-comments/:id', () => {
		it('should return one comment', () => {
			return request(app.getHttpServer())
				.get(`/book-comments/${commentId}`)
				.expect(200)
				.expect((res) => {
					expect(res.body.content).toBe('Great book!');
				});
		});
	});

	describe('PUT /book-comments/:id', () => {
		it('should update a comment', () => {
			return request(app.getHttpServer())
				.put(`/book-comments/${commentId}`)
				.send({ content: 'Updated comment' })
				.expect(200)
				.expect((res) => {
					expect(res.body.content).toBe('Updated comment');
				});
		});
	});

	describe('DELETE /book-comments/:id', () => {
		it('should soft delete a comment', () => {
			return request(app.getHttpServer())
				.delete(`/book-comments/${commentId}`)
				.expect(200);
		});

		it('should return 404 after deletion', () => {
			return request(app.getHttpServer())
				.get(`/book-comments/${commentId}`)
				.expect(404);
		});
	});
});
