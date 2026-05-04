import * as Joi from 'joi';

export const FilterMediaDtoSchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .default(1)
    .optional()
    .description('Numéro de page pour la pagination'),
  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10)
    .optional()
    .description("Nombre d'éléments par page"),
  mimetype: Joi.string()
    .optional()
    .description('Type MIME du média (ex: image/png, application/pdf)'),
  uploadedById: Joi.string()
    .uuid()
    .optional()
    .description("ID de l'utilisateur ayant uploadé le média"),
});

export const UploadMediaDtoSchema = Joi.object({
  uploadedById: Joi.string()
    .uuid()
    .required()
    .description("ID de l'utilisateur qui téléverse le média"),
});
