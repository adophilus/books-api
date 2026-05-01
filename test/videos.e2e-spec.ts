import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import {
	createTestApp,
	cleanDatabase,
	signupAndLogin,
	createTestAuthor,
	createTestVideo,
} from './helpers/e2e-setup';
import request from 'supertest';

describe('Videos (e2e)', () => {
	let app: INestApplication;
	let prisma: PrismaService;
	let token: string;
	let author: any;
	let video: any;

	beforeAll(async () => {
		app = await createTestApp();
		prisma = app.get(PrismaService);
		await cleanDatabase(prisma);

		token = await signupAndLogin(app, 'videouser@test.com');
		author = await createTestAuthor(app, token, 'Video Author', 'videoauthor@test.com');
		video = await createTestVideo(app, author.id);
	});

	afterAll(async () => {
		await cleanDatabase(prisma);
		await app.close();
	});

	describe('POST /videos', () => {
		it('should create a video', () => {
			expect(video).toHaveProperty('id');
			expect(video.title).toBe('Test Video');
			expect(video.url).toBe('https://example.com/video');
		});

		it('should reject invalid url', () => {
			return request(app.getHttpServer())
				.post('/videos')
				.send({
					title: 'Bad URL',
					description: 'desc',
					url: 'not-a-url',
					author_id: author.id,
				})
				.expect(400);
		});

		it('should reject missing fields', () => {
			return request(app.getHttpServer())
				.post('/videos')
				.send({})
				.expect(400);
		});
	});

	describe('GET /videos', () => {
		it('should return all videos', () => {
			return request(app.getHttpServer())
				.get('/videos')
				.expect(200)
				.expect((res) => {
					expect(res.body).toBeInstanceOf(Array);
					expect(res.body.length).toBeGreaterThan(0);
				});
		});
	});

	describe('GET /videos/:id', () => {
		it('should return one video', () => {
			return request(app.getHttpServer())
				.get(`/videos/${video.id}`)
				.expect(200)
				.expect((res) => {
					expect(res.body.title).toBe('Test Video');
				});
		});

		it('should return 404 for non-existent video', () => {
			return request(app.getHttpServer())
				.get('/videos/999999')
				.expect(404);
		});
	});

	describe('PUT /videos/:id', () => {
		it('should update when owner', () => {
			return request(app.getHttpServer())
				.put(`/videos/${video.id}`)
				.set('Authorization', `Bearer ${token}`)
				.send({ title: 'Updated Video' })
				.expect(200)
				.expect((res) => {
					expect(res.body.title).toBe('Updated Video');
				});
		});

		it('should require authentication', () => {
			return request(app.getHttpServer())
				.put(`/videos/${video.id}`)
				.send({ title: 'No Auth' })
				.expect(401);
		});

		it('should reject update by non-owner', async () => {
			const otherToken = await signupAndLogin(app, 'othervid@test.com');
			await createTestAuthor(app, otherToken, 'Other Vid Author', 'othervidauthor@test.com');

			return request(app.getHttpServer())
				.put(`/videos/${video.id}`)
				.set('Authorization', `Bearer ${otherToken}`)
				.send({ title: 'Hacked' })
				.expect(403);
		});
	});

	describe('DELETE /videos/:id', () => {
		it('should require authentication', () => {
			return request(app.getHttpServer())
				.delete(`/videos/${video.id}`)
				.expect(401);
		});

		it('should delete when owner', () => {
			return request(app.getHttpServer())
				.delete(`/videos/${video.id}`)
				.set('Authorization', `Bearer ${token}`)
				.expect(200)
				.expect((res) => {
					expect(res.body.deleted).toBe(true);
				});
		});

		it('should return 404 after deletion', () => {
			return request(app.getHttpServer())
				.get(`/videos/${video.id}`)
				.expect(404);
		});
	});

	describe('GET /authors/:authorId/videos', () => {
		it('should return videos by author', () => {
			return request(app.getHttpServer())
				.get(`/authors/${author.id}/videos`)
				.expect(200)
				.expect((res) => {
					expect(res.body).toBeInstanceOf(Array);
				});
		});
	});
});
