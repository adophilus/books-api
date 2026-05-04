import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Get,
  Query,
  Param,
  Res,
  Delete,
  BadRequestException,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';
import { UploadService } from './upload.service';
import {
  ALLOWED_MEDIA_TYPE,
  FilterMediaDto,
  MAX_MEDIA_SIZE,
  UploadMediaDto,
} from './upload.types';
import {
  FilterMediaDtoSchema,
  UploadMediaDtoSchema,
} from './upload.validaiton';
import { JoiValidationPipe } from 'src/@1hand/pipes/JoiValidatorPipe';
import {
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Media Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @ApiOperation({ summary: 'Uploader un média' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        uploadedById: {
          type: 'string',
          format: 'uuid',
          description: "ID de l'utilisateur qui envoie le média",
        },
      },
      required: ['file', 'uploadedById'],
    },
  })
  @ApiResponse({ status: 201, description: 'Média enregistré avec succès' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, cb) => {
          const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9,
          )}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
      limits: {
        fileSize: MAX_MEDIA_SIZE,
      },
      fileFilter: (_, file, cb) => {
        const allowed = ALLOWED_MEDIA_TYPE;
        if (allowed.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(
            new BadRequestException(
              `Type de média non autorisé : ${
                file.mimetype
              }. Types acceptés : ${allowed.join(', ')}`,
            ),
            false,
          );
        }
      },
    }),
  )
  async uploadMedia(
    @UploadedFile() file: Express.Multer.File,
    @Body(new JoiValidationPipe(UploadMediaDtoSchema)) body: UploadMediaDto,
  ) {
    if (!file) throw new BadRequestException('Média manquant');
    return this.uploadService.saveMedia(file, body.uploadedById);
  }

  @Get()
  @ApiOperation({ summary: 'Lister les médias avec filtres et pagination' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Numéro de page',
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: "Nombre d'éléments par page",
    type: Number,
  })
  @ApiQuery({
    name: 'mimetype',
    required: false,
    description: 'Filtrer par type MIME (ex: image/png)',
    type: String,
  })
  @ApiQuery({
    name: 'uploadedById',
    required: false,
    description: "Filtrer par ID de l'utilisateur qui a uploadé",
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Liste des médias' })
  @UsePipes(new JoiValidationPipe(FilterMediaDtoSchema))
  async getMedia(@Query() query: FilterMediaDto) {
    return this.uploadService.filterMedia(query);
  }

  @Get(':id/view')
  @ApiOperation({ summary: 'Afficher un média dans le navigateur (stream)' })
  @ApiParam({ name: 'id', description: 'ID du média' })
  @ApiResponse({ status: 200, description: 'Média affiché' })
  @ApiResponse({ status: 404, description: 'Média introuvable' })
  async viewMedia(@Param('id') id: string, @Res() res: Response) {
    const { media, stream } = await this.uploadService.streamMedia(id);

    res.setHeader('Content-Type', media.mimetype);
    res.setHeader(
      'Content-Disposition',
      `inline; filename="${media.originalName}"`,
    );

    return stream.pipe(res);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Télécharger un média par ID' })
  @ApiParam({
    name: 'id',
    description: 'ID du média à télécharger',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Média téléchargé' })
  @ApiResponse({ status: 404, description: 'Média introuvable' })
  async downloadMedia(@Param('id') id: string, @Res() res: Response) {
    const media = await this.uploadService.getMediaById(id);
    res.download(media.path, media.originalName);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un média par ID' })
  @ApiParam({
    name: 'id',
    description: 'ID du média à supprimer',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Média supprimé avec succès' })
  @ApiResponse({ status: 404, description: 'Média introuvable' })
  async deleteMedia(@Param('id') id: string) {
    return this.uploadService.deleteMedia(id);
  }
}
