import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../src/prisma.service';
import {
	createTestApp,
	cleanDatabase,
} from './helpers/e2e-setup';
import request from 'supertest';

describe('Book Views (e2e)', () => {
	let app: INestApplication;
	let prisma: PrismaService;
	let authorId: string;
	let bookId: string;
	let viewId: string;

	beforeAll(async () => {
		app = await createTestApp();
		prisma = app.get(PrismaService);
		await cleanDatabase(prisma);

		const authorRes = await request(app.getHttpServer())
			.post('/authors')
			.send({ name: 'BV Author', email: 'bvauthor@test.com' });
		authorId = authorRes.body.id;

		const bookRes = await request(app.getHttpServer())
			.post('/books')
			.send({ title: 'BV Book', authorId });
		bookId = bookRes.body.id;
	});

	afterAll(async () => {
		await cleanDatabase(prisma);
		await app.close();
	});

	describe('POST /book-views', () => {
		it('should create a book view', () => {
			return request(app.getHttpServer())
				.post('/book-views')
				.send({ bookId, authorId })
				.expect(201)
				.expect((res) => {
					viewId = res.body.id;
					expect(res.body).toHaveProperty('code');
					expect(res.body.bookId).toBe(bookId);
				});
		});

		it('should reject invalid bookId', () => {
			return request(app.getHttpServer())
				.post('/book-views')
				.send({ bookId: '00000000-0000-0000-0000-000000000000', authorId })
				.expect(404);
		});
	});

	describe('GET /book-views', () => {
		it('should return paginated book views', () => {
			return request(app.getHttpServer())
				.get('/book-views')
				.expect(200)
				.expect((res) => {
					expect(res.body.data.length).toBeGreaterThan(0);
				});
		});

		it('should filter by bookId', () => {
			return request(app.getHttpServer())
				.get(`/book-views?bookId=${bookId}`)
				.expect(200)
				.expect((res) => {
					expect(res.body.data.length).toBeGreaterThan(0);
				});
		});
	});

	describe('GET /book-views/:id', () => {
		it('should return one book view', () => {
			return request(app.getHttpServer())
				.get(`/book-views/${viewId}`)
				.expect(200);
		});
	});

	describe('DELETE /book-views/:id', () => {
		it('should soft delete a book view', () => {
			return request(app.getHttpServer())
				.delete(`/book-views/${viewId}`)
				.expect(200);
		});

		it('should return 404 after deletion', () => {
			return request(app.getHttpServer())
				.get(`/book-views/${viewId}`)
				.expect(404);
		});
	});
});
