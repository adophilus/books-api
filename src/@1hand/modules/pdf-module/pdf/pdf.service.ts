import { Injectable, Logger } from '@nestjs/common';
import { PdfEngine } from './pdf.engine';
import { TemplateRegistry } from './templates/template.registry';
import {
  GeneratePdfDto,
  GenerateFromHtmlDto,
  PdfTemplate,
  PdfTemplateContract,
  PdfBatch,
} from './pdf.types';
import { PDFDocument } from 'pdf-lib';

@Injectable()
export class PdfService {
  private readonly logger = new Logger(PdfService.name);

  constructor(
    private readonly engine: PdfEngine,
    private readonly registry: TemplateRegistry,
  ) {}

  /**
   * Génère un PDF à partir d'un template enregistré et de données.
   * Si `batches` est fourni, génère chaque lot séparément puis fusionne
   * les buffers pour éviter les timeouts Puppeteer sur les gros volumes.
   */
  async generateFromTemplate(dto: GeneratePdfDto): Promise<Buffer> {
    console.log('EXPORTING FROM TEMPLATE');
    const template = this.registry.get(dto.template);

    // ✅ Mode simple : pas de lots, comportement inchangé
    if (!dto.batches?.length) {
      const html = template.render(dto.data);
      const pdfBuffer = await this.engine.generate({
        html,
        format: dto.format,
        orientation: dto.orientation,
      });
      console.log('PDF unique généré avec succès');
      return pdfBuffer;
    }

    // ✅ Mode lots : génération par lot + fusion finale
    this.logger.log(
      `Génération par lots : ${dto.batches.length} lot(s) à traiter`,
    );
    console.log(`Mode lots - ${dto.batches.length} lot(s) à traiter`);

    const pdfBuffers: Buffer[] = [];

    // Boucle pour traiter chaque lot
    for (const [index, batch] of dto.batches.entries()) {
      this.logger.log(
        `Traitement du lot ${index + 1}/${dto.batches.length} : "${
          batch.label
        }"`,
      );
      console.log(
        `Traitement du lot ${index + 1}/${dto.batches.length} : "${
          batch.label
        }"`,
      );

      try {
        // Page séparatrice du lot
        console.log(
          `Génération de la page séparatrice pour le lot "${batch.label}"...`,
        );
        const separatorBuffer = await this.engine.generate({
          html: this.wrapInDocument(this.renderBatchSeparator(batch.label)),
          format: dto.format,
          orientation: dto.orientation,
        });
        console.log(`Page séparatrice générée pour le lot "${batch.label}"`);

        pdfBuffers.push(separatorBuffer);

        // Contenu du lot
        console.log(`Génération du contenu pour le lot "${batch.label}"...`);
        const contentHtml = template.render({
          ...(dto.data ?? {}),
          students: batch.data,
        });

        const contentBuffer = await this.engine.generate({
          html: contentHtml,
          format: dto.format,
          orientation: dto.orientation,
        });
        console.log(`Contenu généré pour le lot "${batch.label}"`);

        pdfBuffers.push(contentBuffer);
      } catch (error) {
        this.logger.error(
          `Erreur lors du traitement du lot "${batch.label}" : ${error.message}`,
        );
        console.error(
          `Erreur lors du traitement du lot "${batch.label}" : ${error.message}`,
        );
        throw error;
      }
    }

    // Fusionner les fichiers PDF
    this.logger.log(
      `Fusion de ${pdfBuffers.length} PDF (${dto.batches.length} lots)...`,
    );
    console.log(
      `Fusion de ${pdfBuffers.length} PDF (${dto.batches.length} lots)...`,
    );

    return this.mergePdfBuffers(pdfBuffers);
  }
  /**
   * Fusionne plusieurs buffers PDF en un seul document via pdf-lib.
   */
  private async mergePdfBuffers(buffers: Buffer[]): Promise<Buffer> {
    const mergedPdf = await PDFDocument.create();

    for (const buffer of buffers) {
      const pdf = await PDFDocument.load(buffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedBytes = await mergedPdf.save();
    return Buffer.from(mergedBytes);
  }

  /**
   * Génère la page séparatrice pour un lot.
   * Affiche le nom de la classe centré sur une page vierge.
   */
  private renderBatchSeparator(label: string): string {
    return `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100vh;
        margin: 0;
        padding: 0;
        background-color: #ffffff;
        box-sizing: border-box;
      ">
        <div style="text-align: center;">
          <p style="
            font-size: 13px;
            font-weight: 400;
            color: #9ca3af;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            margin-bottom: 16px;
          ">
            Classe
          </p>
          <h1 style="
            font-size: 52px;
            font-weight: 700;
            color: #111827;
            letter-spacing: 0.05em;
            margin: 0 0 24px 0;
          ">
            ${this.escapeHtml(label)}
          </h1>
          <div style="
            width: 60px;
            height: 4px;
            background-color: #111827;
            margin: 0 auto;
            border-radius: 2px;
          "></div>
        </div>
      </div>
    `;
  }

  /**
   * Enveloppe un fragment HTML dans un document complet.
   */
  private wrapInDocument(body: string): string {
    return `
      <!DOCTYPE html>
      <html lang="fr">
        <head>
          <meta charset="UTF-8" />
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Arial, sans-serif; background: #fff; }
          </style>
        </head>
        <body>${body}</body>
      </html>
    `;
  }

  /**
   * Échappe les caractères HTML pour éviter les injections.
   */
  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Génère un PDF directement depuis un HTML brut (template CUSTOM)
   */
  async generateFromHtml(dto: GenerateFromHtmlDto): Promise<Buffer> {
    return this.engine.generate({
      html: dto.html,
      format: dto.format,
      orientation: dto.orientation,
    });
  }

  /**
   * Retourne la liste des templates disponibles
   */
  getAvailableTemplates(): string[] {
    return this.registry.list();
  }

  /**
   * Permet à d'autres modules d'enregistrer leurs propres templates
   */
  registerTemplate(key: PdfTemplate, template: PdfTemplateContract): void {
    this.registry.register(key, template);
  }
}
