import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import {
	createTestApp,
	cleanDatabase,
	signupAndLogin,
	createTestAuthor,
	createTestBook,
} from './helpers/e2e-setup';
import request from 'supertest';

describe('Book Comments (e2e)', () => {
	let app: INestApplication;
	let prisma: PrismaService;
	let token: string;
	let author: any;
	let book: any;
	let comment: any;

	beforeAll(async () => {
		app = await createTestApp();
		prisma = app.get(PrismaService);
		await cleanDatabase(prisma);

		token = await signupAndLogin(app, 'bcuser@test.com');
		author = await createTestAuthor(app, token, 'BC Author', 'bcauthor@test.com');
		book = await createTestBook(app, author.id);
	});

	afterAll(async () => {
		await cleanDatabase(prisma);
		await app.close();
	});

	describe('POST /books/:bookId/comments', () => {
		it('should create a comment when authenticated', () => {
			return request(app.getHttpServer())
				.post(`/books/${book.id}/comments`)
				.set('Authorization', `Bearer ${token}`)
				.send({ content: 'Great book!' })
				.expect(201)
				.expect((res) => {
					comment = res.body;
					expect(res.body).toHaveProperty('id');
					expect(res.body.content).toBe('Great book!');
					expect(res.body.author.id).toBe(author.id);
				});
		});

		it('should require authentication', () => {
			return request(app.getHttpServer())
				.post(`/books/${book.id}/comments`)
				.send({ content: 'No auth' })
				.expect(401);
		});

		it('should reject empty content', () => {
			return request(app.getHttpServer())
				.post(`/books/${book.id}/comments`)
				.set('Authorization', `Bearer ${token}`)
				.send({})
				.expect(400);
		});
	});

	describe('GET /books/:bookId/comments', () => {
		it('should return comments for a book', () => {
			return request(app.getHttpServer())
				.get(`/books/${book.id}/comments`)
				.expect(200)
				.expect((res) => {
					expect(res.body).toBeInstanceOf(Array);
					expect(res.body.length).toBeGreaterThan(0);
				});
		});
	});

	describe('GET /book-comments/:id', () => {
		it('should return one comment', () => {
			return request(app.getHttpServer())
				.get(`/book-comments/${comment.id}`)
				.expect(200)
				.expect((res) => {
					expect(res.body.content).toBe('Great book!');
				});
		});

		it('should return 404 for non-existent comment', () => {
			return request(app.getHttpServer())
				.get('/book-comments/999999')
				.expect(404);
		});
	});

	describe('PUT /book-comments/:id', () => {
		it('should update when owner', () => {
			return request(app.getHttpServer())
				.put(`/book-comments/${comment.id}`)
				.set('Authorization', `Bearer ${token}`)
				.send({ content: 'Updated comment' })
				.expect(200)
				.expect((res) => {
					expect(res.body.content).toBe('Updated comment');
				});
		});

		it('should require authentication', () => {
			return request(app.getHttpServer())
				.put(`/book-comments/${comment.id}`)
				.send({ content: 'No auth' })
				.expect(401);
		});

		it('should reject update by non-owner', async () => {
			const otherToken = await signupAndLogin(app, 'bcother@test.com');

			return request(app.getHttpServer())
				.put(`/book-comments/${comment.id}`)
				.set('Authorization', `Bearer ${otherToken}`)
				.send({ content: 'Hacked' })
				.expect(403);
		});
	});

	describe('DELETE /book-comments/:id', () => {
		it('should require authentication', () => {
			return request(app.getHttpServer())
				.delete(`/book-comments/${comment.id}`)
				.expect(401);
		});

		it('should delete when owner', () => {
			return request(app.getHttpServer())
				.delete(`/book-comments/${comment.id}`)
				.set('Authorization', `Bearer ${token}`)
				.expect(200)
				.expect((res) => {
					expect(res.body.deleted).toBe(true);
				});
		});

		it('should return 404 after deletion', () => {
			return request(app.getHttpServer())
				.get(`/book-comments/${comment.id}`)
				.expect(404);
		});
	});
});
