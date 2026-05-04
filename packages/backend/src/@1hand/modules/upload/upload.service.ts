import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import sharp from 'sharp';
import { PrismaService } from 'src/prisma.service';
import { I18nService } from 'nestjs-i18n';
import { ALLOWED_MEDIA_TYPE, FilterMediaDto } from './upload.types';
import { createReadStream, existsSync } from 'fs';

@Injectable()
export class UploadService {
  backendUrl: string;
  constructor(private prisma: PrismaService, private i18n: I18nService) {
    this.backendUrl = process.env.BACKEND_URL ?? 'http://localhost:3000';
  }

  async saveMedia(file: Express.Multer.File, uploadedById: string) {
    console.log('UPLOADER ID: ', uploadedById);
    const account = await this.prisma.account.findUnique({
      where: { id: uploadedById },
    });

    if (!account) {
      throw new NotFoundException(
        await this.i18n.t('upload.account.not_found', {
          args: { id: uploadedById },
        }),
      );
    }

    if (!ALLOWED_MEDIA_TYPE.includes(file.mimetype)) {
      throw new BadRequestException(
        await this.i18n.t('upload.media.type_not_allowed', {
          args: {
            mimetype: file.mimetype,
            allowed: ALLOWED_MEDIA_TYPE.join(', '),
          },
        }),
      );
    }

    let width: number | undefined;
    let height: number | undefined;

    if (file.mimetype.startsWith('image/')) {
      const metadata = await sharp(file.path).metadata();
      width = metadata.width;
      height = metadata.height;
    }

    const savedMedia = await this.prisma.media.create({
      data: {
        originalName: file.originalname,
        filename: file.filename,
        mimetype: file.mimetype,
        size: file.size,
        path: file.path,
        url: `/uploads/${file.filename}`,
        uploadedById,
        width,
        height,
      },
    });

    return { ...savedMedia, url: `${this.backendUrl}${savedMedia.url}` };
  }

  async filterMedia(filter: FilterMediaDto) {
    const { page = 1, limit = 10 } = filter;

    const where = {
      mimetype: filter.mimetype ? filter.mimetype : undefined,
      uploadedById: filter.uploadedById ? filter.uploadedById : undefined,
      deleted: false,
      archived: false,
    };

    const [total, data] = await this.prisma.$transaction([
      this.prisma.media.count({ where }),
      this.prisma.media.findMany({
        where,
        skip: page && limit ? (page - 1) * limit : undefined,
        take: limit,
        include: {
          uploadedBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const mediaWithUrls = data.map((media) => ({
      ...media,
      url: `${this.backendUrl}${media.url}`,
    }));

    return { page, limit, total, data: mediaWithUrls };
  }

  async getMediaById(id: string) {
    const media = await this.prisma.media.findUnique({
      where: { id },
      include: {
        uploadedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!media || media.deleted) {
      throw new NotFoundException(
        await this.i18n.t('upload.media.not_found', { args: { id } }),
      );
    }

    if (!existsSync(media.path)) {
      throw new NotFoundException(
        await this.i18n.t('upload.media.file_not_found', { args: { id } }),
      );
    }

    return { ...media, url: `${this.backendUrl}${media.url}` };
  }

  async streamMedia(id: string) {
    const media = await this.getMediaById(id);
    const stream = createReadStream(media.path);

    return {
      media,
      stream,
    };
  }

  async deleteMedia(id: string) {
    const media = await this.getMediaById(id);

    return this.prisma.media.update({
      where: { id },
      data: { deleted: true },
    });
  }
}
