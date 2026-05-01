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

describe('Books (e2e)', () => {
	let app: INestApplication;
	let prisma: PrismaService;
	let token: string;
	let author: any;
	let book: any;

	beforeAll(async () => {
		app = await createTestApp();
		prisma = app.get(PrismaService);
		await cleanDatabase(prisma);

		token = await signupAndLogin(app, 'bookuser@test.com');
		author = await createTestAuthor(app, token, 'Book Author', 'bookauthor@test.com');
		book = await createTestBook(app, author.id);
	});

	afterAll(async () => {
		await cleanDatabase(prisma);
		await app.close();
	});

	describe('POST /books', () => {
		it('should create a book', () => {
			expect(book).toHaveProperty('id');
			expect(book.title).toBe('Test Book');
			expect(book.author.id).toBe(author.id);
		});

		it('should reject invalid input', () => {
			return request(app.getHttpServer())
				.post('/books')
				.send({})
				.expect(400);
		});
	});

	describe('GET /books', () => {
		it('should return all books', () => {
			return request(app.getHttpServer())
				.get('/books')
				.expect(200)
				.expect((res) => {
					expect(res.body).toBeInstanceOf(Array);
					expect(res.body.length).toBeGreaterThan(0);
				});
		});
	});

	describe('GET /books/:id', () => {
		it('should return one book', () => {
			return request(app.getHttpServer())
				.get(`/books/${book.id}`)
				.expect(200)
				.expect((res) => {
					expect(res.body.title).toBe('Test Book');
				});
		});

		it('should return 404 for non-existent book', () => {
			return request(app.getHttpServer())
				.get('/books/999999')
				.expect(404);
		});
	});

	describe('PUT /books/:id', () => {
		it('should update a book when owner', () => {
			return request(app.getHttpServer())
				.put(`/books/${book.id}`)
				.set('Authorization', `Bearer ${token}`)
				.send({ title: 'Updated Book' })
				.expect(200)
				.expect((res) => {
					expect(res.body.title).toBe('Updated Book');
				});
		});

		it('should require authentication', () => {
			return request(app.getHttpServer())
				.put(`/books/${book.id}`)
				.send({ title: 'No Auth' })
				.expect(401);
		});

		it('should reject update by non-owner', async () => {
			const otherToken = await signupAndLogin(app, 'other@test.com');
			await createTestAuthor(app, otherToken, 'Other Author', 'otherauthor@test.com');

			return request(app.getHttpServer())
				.put(`/books/${book.id}`)
				.set('Authorization', `Bearer ${otherToken}`)
				.send({ title: 'Hacked' })
				.expect(403);
		});
	});

	describe('DELETE /books/:id', () => {
		it('should require authentication', () => {
			return request(app.getHttpServer())
				.delete(`/books/${book.id}`)
				.expect(401);
		});

		it('should delete a book when owner', () => {
			return request(app.getHttpServer())
				.delete(`/books/${book.id}`)
				.set('Authorization', `Bearer ${token}`)
				.expect(200)
				.expect((res) => {
					expect(res.body.deleted).toBe(true);
				});
		});

		it('should return 404 after deletion', () => {
			return request(app.getHttpServer())
				.get(`/books/${book.id}`)
				.expect(404);
		});
	});

	describe('GET /authors/:authorId/books', () => {
		it('should return books by author', () => {
			return request(app.getHttpServer())
				.get(`/authors/${author.id}/books`)
				.expect(200)
				.expect((res) => {
					expect(res.body).toBeInstanceOf(Array);
				});
		});
	});
});
