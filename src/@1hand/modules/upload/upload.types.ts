import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class FilterMediaDto {
  @ApiPropertyOptional({
    description: 'Numéro de page pour la pagination',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: "Nombre d'éléments par page",
    example: 10,
    default: 10,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional({
    description:
      'Filtrer les médias par type MIME (image/png, application/pdf, etc.)',
    example: 'image/png',
  })
  @IsOptional()
  @IsString()
  mimetype?: string;

  @ApiPropertyOptional({
    description: "Filtrer les médias par l'ID de l'utilisateur ayant uploadé",
    example: 'b6436d2e-1cd5-4a57-8f41-0ad83ebc1c7a',
  })
  @IsOptional()
  @IsUUID()
  uploadedById?: string;
}

export class UploadMediaDto {
  @ApiProperty({
    description: "ID de l'utilisateur qui téléverse le média",
    example: 'b6436d2e-1cd5-4a57-8f41-0ad83ebc1c7a',
  })
  @IsUUID()
  uploadedById: string;
}

export const ALLOWED_MEDIA_TYPE = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
  'video/mp4',
  'video/mpeg',
  'audio/mpeg',
  'audio/wav',
];

export const MAX_MEDIA_SIZE = 10 * 1024 * 1024; // 10 Mo
