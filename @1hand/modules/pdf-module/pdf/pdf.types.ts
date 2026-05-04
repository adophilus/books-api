import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsObject, IsEnum } from 'class-validator';

export enum PdfTemplate {
  STUDENT_CARD = 'student-card',
  OFFICIAL_STUDENT_CARD = 'official-student-card',
  REPORT_CARD = 'report-card',
  INVOICE = 'invoice',
  RECEIPT = 'receipt',
  CUSTOM = 'custom',
}

export enum PdfFormat {
  A4 = 'A4',
  A3 = 'A3',
  LETTER = 'Letter',
}

export enum PdfOrientation {
  PORTRAIT = 'portrait',
  LANDSCAPE = 'landscape',
}

// ─── Contrat générique que tout template doit respecter ───────────────────────

export interface PdfTemplateContract<TData = Record<string, any>> {
  /**
   * Reçoit les données et retourne une chaîne HTML complète
   */
  render(data: TData): string;
}

export interface PdfBatch {
  label: string; // Nom affiché sur la page séparatrice (ex: "6ème A")
  data: any[]; // Données du lot (ex: liste d'élèves de cette classe)
}

// ─── DTO de génération ─────────────────────────────────────────────────────────

export class GeneratePdfDto {
  @ApiProperty({
    enum: PdfTemplate,
    example: PdfTemplate.STUDENT_CARD,
    description: 'Template à utiliser pour la génération',
  })
  @IsEnum(PdfTemplate)
  template: PdfTemplate;

  @ApiProperty({
    description: 'Données à injecter dans le template',
    example: { students: [] },
  })
  @IsObject()
  data: Record<string, any>;

  @ApiPropertyOptional({
    description:
      'Lots de données groupés (ex: par classe). Insère une page séparatrice entre chaque lot.',
    type: 'array',
  })
  @IsOptional()
  batches?: PdfBatch[];

  @ApiPropertyOptional({
    enum: PdfFormat,
    default: PdfFormat.A4,
  })
  @IsOptional()
  @IsEnum(PdfFormat)
  format?: PdfFormat = PdfFormat.A4;

  @ApiPropertyOptional({
    enum: PdfOrientation,
    default: PdfOrientation.PORTRAIT,
  })
  @IsOptional()
  @IsEnum(PdfOrientation)
  orientation?: PdfOrientation = PdfOrientation.PORTRAIT;

  @ApiPropertyOptional({
    description: 'Nom du fichier téléchargé',
    example: 'cartes-eleves-2025.pdf',
  })
  @IsOptional()
  @IsString()
  filename?: string;
}

export class GenerateFromHtmlDto {
  @ApiProperty({
    description: 'HTML brut à convertir en PDF',
  })
  @IsString()
  html: string;

  @ApiPropertyOptional({ enum: PdfFormat, default: PdfFormat.A4 })
  @IsOptional()
  @IsEnum(PdfFormat)
  format?: PdfFormat = PdfFormat.A4;

  @ApiPropertyOptional({
    enum: PdfOrientation,
    default: PdfOrientation.PORTRAIT,
  })
  @IsOptional()
  @IsEnum(PdfOrientation)
  orientation?: PdfOrientation = PdfOrientation.PORTRAIT;

  @ApiPropertyOptional({ example: 'document.pdf' })
  @IsOptional()
  @IsString()
  filename?: string;
}

// ─── Options internes du moteur Puppeteer ─────────────────────────────────────

export interface PdfEngineOptions {
  html: string;
  format?: PdfFormat;
  orientation?: PdfOrientation;
  margin?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  printBackground?: boolean;
}

// ─── Types des données pour chaque template ───────────────────────────────────

export interface StudentCardData {
  students: {
    nom: string;
    prenom: string;
    classe: string;
    annee: string;
    matricule?: string;
    photo?: string; // base64 ou URL
    schoolName?: string;
    schoolLogo?: string; // base64 ou URL
  }[];
  cardsPerPage?: number; // défaut: 10
  schoolName?: string;
  schoolLogo?: string;
}

// export interface ReportCardData {
//   school: {
//     name: string;
//     shortName?: string;
//     logo?: string;
//     address?: string;
//   };

//   student: {
//     nom: string;
//     prenom: string;
//     fullName?: string;
//     matricule: string;
//     classe: string;
//     annee: string;
//     photo?: string;

//     gender?: string;
//     birthDate?: string;
//     birthPlace?: string;
//     nationality?: string;
//     guardian?: string;
//     enrollment?: number | string;
//     repeating?: string;
//     classMaster?: string;
//   };

//   classMaster?: string;
//   reportTitle?: string;
//   periodLabel?: string;
//   semester?: string;

//   leftHeader?: {
//     country?: string;
//     motto?: string;
//     ministry?: string;
//     contact?: string;
//   };

//   rightHeader?: {
//     country?: string;
//     motto?: string;
//     ministry?: string;
//     contact?: string;
//   };

//   centerSealText?: string;

//   rows?: Array<
//     | {
//         type: 'group';
//         label: string;
//       }
//     | {
//         type?: 'row';
//         subject: string;
//         skills?: string;
//         coefficient?: number | string;
//         s1Grade?: number | string;
//         s1Weighted?: number | string;
//         s2Grade?: number | string;
//         s2Weighted?: number | string;
//         periodGrade?: number | string;
//         periodWeighted?: number | string;
//         appreciation?: string;
//         teacher?: string;
//       }
//   >;

//   subjects?: {
//     name: string;
//     grade: number;
//     maxGrade: number;
//     coefficient: number;
//     teacher?: string;
//     appreciation?: string;
//   }[];

//   totals?: {
//     coefficient?: number | string;
//     s1?: number | string;
//     s2?: number | string;
//     period?: number | string;
//   };

//   averages?: {
//     s1Average?: number | string;
//     s1Rank?: number | string;
//     s2Average?: number | string;
//     s2Rank?: number | string;
//     periodAverage?: number | string;
//     periodRank?: number | string;
//   };

//   average?: number;
//   rank?: number;
//   totalStudents?: number;
//   generalAppreciation?: string;

//   stats?: {
//     highestAverage?: number | string;
//     lowestAverage?: number | string;
//     passed?: number | string;
//     passRate?: string;
//     classAverage?: number | string;
//   };

//   decision?: string;
//   mention?: string;
//   absences?: string;
//   punishments?: string;

//   recap?: Array<{
//     label: string;
//     average?: number | string;
//     rank?: number | string;
//   }>;

//   principalSignature?: string;
//   generatedAt?: string;
// }

export interface ReportCardData {
  school: {
    name: string;
    shortName?: string;
    logo?: string;
    address?: string;
  };

  student: {
    nom: string;
    prenom: string;
    fullName?: string;
    matricule: string;
    classe: string;
    annee: string;
    photo?: string;
    gender?: string;
    birthDate?: string;
    birthPlace?: string;
    nationality?: string;
    guardian?: string;
    enrollment?: number | string;
    repeating?: string;
    classMaster?: string;
  };

  reportTitle?: string;
  periodLabel?: string;

  leftHeader?: {
    country?: string;
    motto?: string;
    ministry?: string;
    contact?: string;
  };

  rightHeader?: {
    country?: string;
    motto?: string;
    ministry?: string;
    contact?: string;
  };

  centerSealText?: string;

  periods: {
    id: string;
    code: string;
    name: string;
    kind: 'SEQUENCE' | 'TERM' | 'YEAR';
    order?: number;
  }[];

  rows: Array<{
    type?: 'row';
    subject: string;
    skills?: string;
    coefficient?: number | string;
    values: Record<
      string,
      {
        grade?: number | string;
        weighted?: number | string;
      }
    >;
    appreciation?: string;
  }>;

  totals?: {
    coefficient?: number | string;
    perPeriod?: Record<
      string,
      {
        total?: number | string;
      }
    >;
  };

  averages?: {
    perPeriod?: Record<
      string,
      {
        average?: number | string;
        rank?: number | string;
      }
    >;
  };

  stats?: {
    highestAverage?: number | string;
    lowestAverage?: number | string;
    passed?: number | string;
    passRate?: string;
    classAverage?: number | string;
  };

  decision?: string;
  mention?: string;
  absences?: string;
  punishments?: string;

  recap?: Array<{
    label: string;
    average?: number | string;
    rank?: number | string;
  }>;

  principalSignature?: string;
  generatedAt?: string;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate?: string;
  seller: {
    name: string;
    address: string;
    email?: string;
    phone?: string;
    logo?: string;
  };
  buyer: {
    name: string;
    address?: string;
    email?: string;
  };
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  tax?: number;
  taxRate?: number;
  total: number;
  currency?: string;
  notes?: string;
}

export interface ReceiptData {
  receiptNumber: string;
  date: string;
  organization: {
    name: string;
    address?: string;
    logo?: string;
  };
  payer: {
    name: string;
    contact?: string;
  };
  amount: number;
  currency?: string;
  reason: string;
  paymentMethod?: string;
  notes?: string;
}
