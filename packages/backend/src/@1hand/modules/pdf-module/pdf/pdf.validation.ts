import * as Joi from 'joi';
import { PdfTemplate, PdfFormat, PdfOrientation } from './pdf.types';

const pdfOptionsSchema = {
  format: Joi.string()
    .valid(...Object.values(PdfFormat))
    .optional()
    .default(PdfFormat.A4),
  orientation: Joi.string()
    .valid(...Object.values(PdfOrientation))
    .optional()
    .default(PdfOrientation.PORTRAIT),
  filename: Joi.string().optional(),
};

export const GeneratePdfSchema = Joi.object({
  template: Joi.string()
    .valid(...Object.values(PdfTemplate))
    .required(),
  data: Joi.object().required(),
  ...pdfOptionsSchema,
});

export const GenerateFromHtmlSchema = Joi.object({
  html: Joi.string().min(1).required(),
  ...pdfOptionsSchema,
});
