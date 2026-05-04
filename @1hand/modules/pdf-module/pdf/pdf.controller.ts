import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  UsePipes,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JoiValidationPipe } from 'src/@1hand/pipes/JoiValidatorPipe';
import { PdfService } from './pdf.service';
import { GeneratePdfDto, GenerateFromHtmlDto } from './pdf.types';
import { GeneratePdfSchema, GenerateFromHtmlSchema } from './pdf.validation';

@ApiTags('PDF')
@Controller('pdf')
export class PdfController {
  constructor(private readonly service: PdfService) {}

  /**
   * Génère un PDF à partir d'un template et de données structurées
   */
  @Post('generate')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new JoiValidationPipe(GeneratePdfSchema))
  @ApiOperation({ summary: 'Génère un PDF depuis un template enregistré' })
  @ApiResponse({ status: 200, description: 'Fichier PDF retourné en stream' })
  async generateFromTemplate(
    @Body() dto: GeneratePdfDto,
    @Res() res: Response,
  ) {
    const buffer = await this.service.generateFromTemplate(dto);
    const filename = dto.filename ?? `${dto.template}-${Date.now()}.pdf`;

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }

  /**
   * Génère un PDF depuis un HTML brut
   */
  @Post('generate/html')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new JoiValidationPipe(GenerateFromHtmlSchema))
  @ApiOperation({ summary: 'Génère un PDF depuis un HTML brut (template custom)' })
  @ApiResponse({ status: 200, description: 'Fichier PDF retourné en stream' })
  async generateFromHtml(
    @Body() dto: GenerateFromHtmlDto,
    @Res() res: Response,
  ) {
    const buffer = await this.service.generateFromHtml(dto);
    const filename = dto.filename ?? `document-${Date.now()}.pdf`;

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }

  /**
   * Liste les templates disponibles
   */
  @Get('templates')
  @ApiOperation({ summary: 'Liste les templates PDF disponibles' })
  getAvailableTemplates() {
    return {
      templates: this.service.getAvailableTemplates(),
    };
  }
}
