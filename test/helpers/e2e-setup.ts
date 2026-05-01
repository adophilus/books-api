import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';
import { AppModule } from '../../src/app.module';
import request from 'supertest';

export async function createTestApp() {
	const moduleFixture: TestingModule = await Test.createTestingModule({
		imports: [AppModule],
	}).compile();

	const app = moduleFixture.createNestApplication();
	app.useGlobalPipes(new ValidationPipe({ transform: true }));
	await app.init();

	return app;
}

export async function cleanDatabase(prisma: PrismaService) {
	await prisma.bookComment.deleteMany();
	await prisma.videoComment.deleteMany();
	await prisma.bookView.deleteMany();
	await prisma.videoView.deleteMany();
	await prisma.book.deleteMany();
	await prisma.video.deleteMany();
	await prisma.author.deleteMany();
	await prisma.user.deleteMany();
}

export function signup(
	app: INestApplication,
	email: string,
	password = 'password123',
) {
	return request(app.getHttpServer())
		.post('/auth/sign-up')
		.send({ email, password });
}

export async function signin(
	app: INestApplication,
	email: string,
	password = 'password123',
) {
	const res = await request(app.getHttpServer())
		.post('/auth/sign-in')
		.send({ email, password });
	return res.body.accessToken;
}

export async function signupAndLogin(
	app: INestApplication,
	email: string,
	password = 'password123',
) {
	await signup(app, email, password);
	return signin(app, email, password);
}

export async function createTestAuthor(
	app: INestApplication,
	token: string,
	name: string,
	email: string,
) {
	const res = await request(app.getHttpServer())
		.post('/authors')
		.set('Authorization', `Bearer ${token}`)
		.send({ name, email });
	return res.body;
}

export async function createTestBook(
	app: INestApplication,
	authorId: number,
	title = 'Test Book',
	description = 'A test book',
) {
	const res = await request(app.getHttpServer())
		.post('/books')
		.send({ title, description, author_id: authorId });
	return res.body;
}

export async function createTestVideo(
	app: INestApplication,
	authorId: number,
	title = 'Test Video',
	description = 'A test video',
	url = 'https://example.com/video',
) {
	const res = await request(app.getHttpServer())
		.post('/videos')
		.send({ title, description, url, author_id: authorId });
	return res.body;
}
