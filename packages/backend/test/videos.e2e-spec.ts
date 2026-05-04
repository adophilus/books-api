import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../src/prisma.service';
import {
	createTestApp,
	cleanDatabase,
} from './helpers/e2e-setup';
import request from 'supertest';

describe('Videos (e2e)', () => {
	let app: INestApplication;
	let prisma: PrismaService;
	let authorId: string;
	let videoId: string;

	beforeAll(async () => {
		app = await createTestApp();
		prisma = app.get(PrismaService);
		await cleanDatabase(prisma);

		const authorRes = await request(app.getHttpServer())
			.post('/authors')
			.send({ name: 'Video Author', email: 'vidauthor@test.com' });
		authorId = authorRes.body.id;
	});

	afterAll(async () => {
		await cleanDatabase(prisma);
		await app.close();
	});

	describe('POST /videos', () => {
		it('should create a video', () => {
			return request(app.getHttpServer())
				.post('/videos')
				.send({ title: 'Test Video', description: 'A test', url: 'https://example.com/video.mp4', authorId })
				.expect(201)
				.expect((res) => {
					videoId = res.body.id;
					expect(res.body).toHaveProperty('code');
					expect(res.body.url).toBe('https://example.com/video.mp4');
				});
		});

		it('should reject invalid url', () => {
			return request(app.getHttpServer())
				.post('/videos')
				.send({ title: 'Bad', url: 'not-a-url', authorId })
				.expect(400);
		});
	});

	describe('GET /videos', () => {
		it('should return paginated videos', () => {
			return request(app.getHttpServer())
				.get('/videos')
				.expect(200)
				.expect((res) => {
					expect(res.body.data.length).toBeGreaterThan(0);
				});
		});
	});

	describe('GET /videos/:id', () => {
		it('should return one video', () => {
			return request(app.getHttpServer())
				.get(`/videos/${videoId}`)
				.expect(200)
				.expect((res) => {
					expect(res.body.title).toBe('Test Video');
				});
		});
	});

	describe('PUT /videos/:id', () => {
		it('should update a video', () => {
			return request(app.getHttpServer())
				.put(`/videos/${videoId}`)
				.send({ title: 'Updated Video' })
				.expect(200)
				.expect((res) => {
					expect(res.body.title).toBe('Updated Video');
				});
		});
	});

	describe('DELETE /videos/:id', () => {
		it('should soft delete a video', () => {
			return request(app.getHttpServer())
				.delete(`/videos/${videoId}`)
				.expect(200);
		});
	});
});
