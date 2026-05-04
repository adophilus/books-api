import { Injectable, BadRequestException } from '@nestjs/common';
import { PdfTemplate, PdfTemplateContract } from '../pdf.types';
import { StudentCardTemplate } from './student-card.template';
import { OfficialStudentCardTemplate } from './official-student-card.template';
import { ReportCardTemplate } from './report-card.template';
import { InvoiceTemplate } from './invoice.template';
import { ReceiptTemplate } from './receipt.template';

@Injectable()
export class TemplateRegistry {
  private readonly registry = new Map<PdfTemplate, PdfTemplateContract>([
    [PdfTemplate.STUDENT_CARD, new StudentCardTemplate()],
    [PdfTemplate.OFFICIAL_STUDENT_CARD, new OfficialStudentCardTemplate()],
    [PdfTemplate.REPORT_CARD, new ReportCardTemplate()],
    [PdfTemplate.INVOICE, new InvoiceTemplate()],
    [PdfTemplate.RECEIPT, new ReceiptTemplate()],
  ]);

  /**
   * Récupère un template par son identifiant
   */
  get(template: PdfTemplate): PdfTemplateContract {
    const instance = this.registry.get(template);
    if (!instance) {
      throw new BadRequestException(
        `Template "${template}" non trouvé. Templates disponibles : ${this.list().join(
          ', ',
        )}`,
      );
    }
    return instance;
  }

  /**
   * Enregistre un template personnalisé (utile pour les modules tiers)
   */
  register(key: PdfTemplate, template: PdfTemplateContract): void {
    this.registry.set(key, template);
  }

  /**
   * Retourne la liste des templates disponibles
   */
  list(): string[] {
    return Array.from(this.registry.keys());
  }
}
