import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../src/prisma.service';
import {
	createTestApp,
	cleanDatabase,
} from './helpers/e2e-setup';
import request from 'supertest';

describe('Video Views (e2e)', () => {
	let app: INestApplication;
	let prisma: PrismaService;
	let authorId: string;
	let videoId: string;
	let viewId: string;

	beforeAll(async () => {
		app = await createTestApp();
		prisma = app.get(PrismaService);
		await cleanDatabase(prisma);

		const authorRes = await request(app.getHttpServer())
			.post('/authors')
			.send({ name: 'VV Author', email: 'vvauthor@test.com' });
		authorId = authorRes.body.id;

		const videoRes = await request(app.getHttpServer())
			.post('/videos')
			.send({ title: 'VV Video', url: 'https://example.com/v.mp4', authorId });
		videoId = videoRes.body.id;
	});

	afterAll(async () => {
		await cleanDatabase(prisma);
		await app.close();
	});

	describe('POST /video-views', () => {
		it('should create a video view', () => {
			return request(app.getHttpServer())
				.post('/video-views')
				.send({ videoId, authorId })
				.expect(201)
				.expect((res) => {
					viewId = res.body.id;
					expect(res.body.videoId).toBe(videoId);
				});
		});
	});

	describe('GET /video-views', () => {
		it('should return paginated video views', () => {
			return request(app.getHttpServer())
				.get('/video-views')
				.expect(200)
				.expect((res) => {
					expect(res.body.data.length).toBeGreaterThan(0);
				});
		});
	});

	describe('DELETE /video-views/:id', () => {
		it('should soft delete a video view', () => {
			return request(app.getHttpServer())
				.delete(`/video-views/${viewId}`)
				.expect(200);
		});
	});
});
