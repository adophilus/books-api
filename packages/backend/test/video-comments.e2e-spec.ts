import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../src/prisma.service';
import {
	createTestApp,
	cleanDatabase,
} from './helpers/e2e-setup';
import request from 'supertest';

describe('Video Comments (e2e)', () => {
	let app: INestApplication;
	let prisma: PrismaService;
	let authorId: string;
	let videoId: string;
	let commentId: string;

	beforeAll(async () => {
		app = await createTestApp();
		prisma = app.get(PrismaService);
		await cleanDatabase(prisma);

		const authorRes = await request(app.getHttpServer())
			.post('/authors')
			.send({ name: 'VC Author', email: 'vcauthor@test.com' });
		authorId = authorRes.body.id;

		const videoRes = await request(app.getHttpServer())
			.post('/videos')
			.send({ title: 'VC Video', url: 'https://example.com/v.mp4', authorId });
		videoId = videoRes.body.id;
	});

	afterAll(async () => {
		await cleanDatabase(prisma);
		await app.close();
	});

	describe('POST /video-comments', () => {
		it('should create a comment', () => {
			return request(app.getHttpServer())
				.post('/video-comments')
				.send({ videoId, authorId, content: 'Great video!' })
				.expect(201)
				.expect((res) => {
					commentId = res.body.id;
					expect(res.body.content).toBe('Great video!');
				});
		});
	});

	describe('GET /video-comments', () => {
		it('should return paginated comments', () => {
			return request(app.getHttpServer())
				.get('/video-comments')
				.expect(200)
				.expect((res) => {
					expect(res.body.data.length).toBeGreaterThan(0);
				});
		});
	});

	describe('PUT /video-comments/:id', () => {
		it('should update a comment', () => {
			return request(app.getHttpServer())
				.put(`/video-comments/${commentId}`)
				.send({ content: 'Updated comment' })
				.expect(200)
				.expect((res) => {
					expect(res.body.content).toBe('Updated comment');
				});
		});
	});

	describe('DELETE /video-comments/:id', () => {
		it('should soft delete a comment', () => {
			return request(app.getHttpServer())
				.delete(`/video-comments/${commentId}`)
				.expect(200);
		});
	});
});
