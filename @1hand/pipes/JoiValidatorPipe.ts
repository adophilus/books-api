import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any) {
    console.log('🔍 JoiValidationPipe - Value reçue:', value);
    console.log('🔍 JoiValidationPipe - Type:', typeof value);
    console.log('🔍 JoiValidationPipe - Is Array:', Array.isArray(value));

    // Ne pas valider si la valeur est null ou undefined
    if (value === null || value === undefined) {
      return value;
    }

    // Ne pas valider les types primitifs (string, number, boolean)
    if (typeof value !== 'object') {
      return value;
    }

    // Valider les objets ET les tableaux
    const { error, value: validatedValue } = this.schema.validate(value, {
      abortEarly: false,
      stripUnknown: false, // Ne pas supprimer les champs inconnus
    });

    if (error) {
      console.error('❌ Validation Joi error:', error.details);
      throw new BadRequestException(
        error.details.map((detail) => ({
          field: detail.path.join('.'),
          message: detail.message,
        })),
      );
    }

    console.log('✅ Validation Joi réussie');
    return validatedValue;
  }
}
