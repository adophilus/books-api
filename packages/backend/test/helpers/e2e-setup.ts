import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../../src/prisma.service';
import { AppModule } from '../../src/app.module';
import request from 'supertest';

export async function createTestApp() {
	const moduleFixture: TestingModule = await Test.createTestingModule({
		imports: [AppModule],
	}).compile();

	const app = moduleFixture.createNestApplication();
	await app.init();

	return app;
}

export async function cleanDatabase(prisma: PrismaService) {
	await prisma.videoComment.deleteMany();
	await prisma.bookComment.deleteMany();
	await prisma.videoView.deleteMany();
	await prisma.bookView.deleteMany();
	await prisma.video.deleteMany();
	await prisma.book.deleteMany();
	await prisma.author.deleteMany();
}

export async function createTestAuthor(
	app: INestApplication,
	name: string,
	email: string,
) {
	const res = await request(app.getHttpServer())
		.post('/authors')
		.send({ name, email });
	return res.body;
}

export async function createTestBook(
	app: INestApplication,
	authorId: string,
	title = 'Test Book',
	description = 'A test book',
) {
	const res = await request(app.getHttpServer())
		.post('/books')
		.send({ title, description, authorId });
	return res.body;
}

export async function createTestVideo(
	app: INestApplication,
	authorId: string,
	title = 'Test Video',
	description = 'A test video',
	url = 'https://example.com/video',
) {
	const res = await request(app.getHttpServer())
		.post('/videos')
		.send({ title, description, url, authorId });
	return res.body;
}
