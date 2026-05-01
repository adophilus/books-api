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

describe('Video Views (e2e)', () => {
	let app: INestApplication;
	let prisma: PrismaService;
	let token: string;
	let author: any;
	let video: any;
	let view: any;

	beforeAll(async () => {
		app = await createTestApp();
		prisma = app.get(PrismaService);
		await cleanDatabase(prisma);

		token = await signupAndLogin(app, 'vvuser@test.com');
		author = await createTestAuthor(app, token, 'VV Author', 'vvauthor@test.com');
		video = await createTestVideo(app, author.id);
	});

	afterAll(async () => {
		await cleanDatabase(prisma);
		await app.close();
	});

	describe('POST /videos/:videoId/views', () => {
		it('should create a view when authenticated', () => {
			return request(app.getHttpServer())
				.post(`/videos/${video.id}/views`)
				.set('Authorization', `Bearer ${token}`)
				.expect(201)
				.expect((res) => {
					view = res.body;
					expect(res.body).toHaveProperty('id');
					expect(res.body.author.id).toBe(author.id);
				});
		});

		it('should require authentication', () => {
			return request(app.getHttpServer())
				.post(`/videos/${video.id}/views`)
				.expect(401);
		});
	});

	describe('GET /videos/:videoId/views', () => {
		it('should return views for a video', () => {
			return request(app.getHttpServer())
				.get(`/videos/${video.id}/views`)
				.expect(200)
				.expect((res) => {
					expect(res.body).toBeInstanceOf(Array);
					expect(res.body.length).toBeGreaterThan(0);
				});
		});
	});

	describe('DELETE /video-views/:id', () => {
		it('should require authentication', () => {
			return request(app.getHttpServer())
				.delete(`/video-views/${view.id}`)
				.expect(401);
		});

		it('should delete when owner', () => {
			return request(app.getHttpServer())
				.delete(`/video-views/${view.id}`)
				.set('Authorization', `Bearer ${token}`)
				.expect(200)
				.expect((res) => {
					expect(res.body.deleted).toBe(true);
				});
		});

		it('should reject delete by non-owner', async () => {
			const viewRes = await request(app.getHttpServer())
				.post(`/videos/${video.id}/views`)
				.set('Authorization', `Bearer ${token}`);

			const otherToken = await signupAndLogin(app, 'vvother@test.com');

			return request(app.getHttpServer())
				.delete(`/video-views/${viewRes.body.id}`)
				.set('Authorization', `Bearer ${otherToken}`)
				.expect(403);
		});
	});

	describe('GET /authors/:authorId/video-views', () => {
		it('should return views by author', () => {
			return request(app.getHttpServer())
				.get(`/authors/${author.id}/video-views`)
				.expect(200)
				.expect((res) => {
					expect(res.body).toBeInstanceOf(Array);
				});
		});
	});
});
