import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, Length } from 'class-validator';

export class PhoneNumberDto {
  @ApiProperty({ example: '+237' })
  @IsString()
  @Matches(/^\+\d{1,4}$/, {
    message: 'Le dialCode doit être au format +NNN (ex: +237).',
  })
  dialCode: string;

  @ApiProperty({ example: 'CM' })
  @IsString()
  @Length(2, 2, {
    message: 'Le code pays iso2 doit contenir exactement 2 lettres.',
  })
  iso2: string;

  @ApiProperty({ example: '690123456' })
  @IsString()
  @Matches(/^\d{4,14}$/, {
    message: 'Le numéro national doit contenir entre 4 et 14 chiffres.',
  })
  nationalNumber: string;

  @ApiProperty({ example: '+237690123456' })
  @IsString()
  @Matches(/^\+[1-9]\d{1,14}$/, {
    message:
      'Le numéro international doit être au format E.164 (ex: +237690123456).',
  })
  internationalNumber: string;
}
