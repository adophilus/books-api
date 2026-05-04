import { Module, Global } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { PdfEngine } from './pdf.engine';
import { TemplateRegistry } from './templates/template.registry';

/**
 * Module PDF générique.
 *
 * Marquer @Global() permet à n'importe quel module de l'application
 * d'injecter PdfService sans avoir besoin de réimporter PdfModule.
 *
 * Utilisation dans un autre module :
 *   constructor(private readonly pdfService: PdfService) {}
 *   await this.pdfService.generateFromTemplate({ template: PdfTemplate.INVOICE, data: {...} });
 */
@Global()
@Module({
  providers: [PdfEngine, TemplateRegistry, PdfService],
  controllers: [PdfController],
  exports: [PdfService],
})
export class PdfModule {}
