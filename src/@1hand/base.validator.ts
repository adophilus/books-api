import * as Joi from 'joi';

/* ---------------------------------- *
 *     Schéma réutilisable Phone      *
 *   (ngx-intl-tel-input-like shape)  *
 * ---------------------------------- */
export const PhoneNumberSchema = Joi.object({
  dialCode: Joi.string()
    .pattern(/^\+\d{1,4}$/) // +237, +33, +1...
    .required()
    .messages({
      'string.base': 'Le dialCode doit être une chaîne de caractères.',
      'string.pattern.base': 'Le dialCode doit être au format +NNN (ex: +237).',
      'any.required': 'Le dialCode est requis.',
    }),
  iso2: Joi.string().uppercase().length(2).required().messages({
    'string.base': 'Le code pays iso2 doit être une chaîne de caractères.',
    'string.length': 'Le code pays iso2 doit contenir exactement 2 lettres.',
    'any.required': 'Le code pays iso2 est requis.',
  }),
  nationalNumber: Joi.string()
    .pattern(/^\d{4,14}$/) // souple: 4 à 14 chiffres
    .required()
    .messages({
      'string.base': 'Le numéro national doit être une chaîne de caractères.',
      'string.pattern.base':
        'Le numéro national doit contenir entre 4 et 14 chiffres.',
      'any.required': 'Le numéro national est requis.',
    }),
  internationalNumber: Joi.string()
    .pattern(/^\+[1-9]\d{1,14}$/) // E.164
    .required()
    .messages({
      'string.base':
        'Le numéro international doit être une chaîne de caractères.',
      'string.pattern.base':
        'Le numéro international doit être au format E.164 (ex: +237690123456).',
      'any.required': 'Le numéro international est requis.',
    }),
})
  .required()
  .messages({
    'object.base': 'Le numéro de téléphone doit être un objet.',
    'any.required': 'Le numéro de téléphone est requis.',
  });
