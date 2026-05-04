# Module PDF — NestJS

Module générique pour la génération de PDFs via Puppeteer.  
Conçu pour s'intégrer dans n'importe quel projet NestJS.

---

## Installation

```bash
npm install puppeteer
```

---

## Intégration dans app.module.ts

```typescript
import { PdfModule } from './pdf/pdf.module';

@Module({
  imports: [
    PdfModule, // ← ajouter ici (Global, pas besoin de le réimporter ailleurs)
    ...
  ],
})
export class AppModule {}
```

---

## Endpoints disponibles

| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/pdf/generate` | Génère un PDF depuis un template |
| `POST` | `/pdf/generate/html` | Génère un PDF depuis un HTML brut |
| `GET` | `/pdf/templates` | Liste les templates disponibles |

---

## Templates disponibles

| Clé | Description |
|-----|-------------|
| `student-card` | Cartes scolaires (10 par page) |
| `report-card` | Bulletin de notes |
| `invoice` | Facture |
| `receipt` | Reçu de paiement |
| `custom` | HTML libre (via `/pdf/generate/html`) |

---

## Exemples d'utilisation

### 1. Cartes scolaires (500 élèves → 1 PDF, 10 cartes/page)

```json
POST /pdf/generate
{
  "template": "student-card",
  "filename": "cartes-2025.pdf",
  "data": {
    "schoolName": "Lycée Bilingue de Yaoundé",
    "cardsPerPage": 10,
    "students": [
      {
        "nom": "MBARGA",
        "prenom": "Jean",
        "classe": "Terminale A",
        "annee": "2024-2025",
        "matricule": "LBY-2025-001",
        "photo": "data:image/jpeg;base64,..."
      }
    ]
  }
}
```

### 2. Bulletin de notes

```json
POST /pdf/generate
{
  "template": "report-card",
  "filename": "bulletin-jean-mbarga.pdf",
  "data": {
    "student": {
      "nom": "MBARGA", "prenom": "Jean",
      "matricule": "LBY-001", "classe": "Tle A", "annee": "2024-2025"
    },
    "school": { "name": "Lycée Bilingue", "address": "Yaoundé, Cameroun" },
    "semester": "1er Semestre",
    "subjects": [
      { "name": "Mathématiques", "grade": 15, "maxGrade": 20, "coefficient": 4 },
      { "name": "Français", "grade": 13, "maxGrade": 20, "coefficient": 3 }
    ],
    "rank": 3,
    "totalStudents": 42
  }
}
```

### 3. Facture

```json
POST /pdf/generate
{
  "template": "invoice",
  "filename": "facture-2025-001.pdf",
  "data": {
    "invoiceNumber": "FAC-2025-001",
    "date": "14/03/2025",
    "seller": { "name": "Mon École SARL", "address": "Yaoundé, Cameroun" },
    "buyer": { "name": "M. NGUEMA Paul" },
    "items": [
      { "description": "Frais de scolarité T1", "quantity": 1, "unitPrice": 150000, "total": 150000 }
    ],
    "subtotal": 150000,
    "total": 150000,
    "currency": "FCFA"
  }
}
```

### 4. HTML personnalisé

```json
POST /pdf/generate/html
{
  "html": "<html><body><h1>Mon document</h1></body></html>",
  "format": "A4",
  "filename": "mon-doc.pdf"
}
```

---

## Injection dans un autre service

```typescript
import { Injectable } from '@nestjs/common';
import { PdfService, PdfTemplate } from '../pdf';

@Injectable()
export class StudentsService {
  constructor(private readonly pdfService: PdfService) {}

  async exportStudentCards(students: any[]) {
    return this.pdfService.generateFromTemplate({
      template: PdfTemplate.STUDENT_CARD,
      data: { students },
      filename: 'cartes.pdf',
    });
  }
}
```

---

## Ajouter un template personnalisé

```typescript
// 1. Créer le template
import { PdfTemplateContract } from '../pdf';

export class AttestationTemplate implements PdfTemplateContract {
  render(data: any): string {
    return `<html><body>Attestation de ${data.nom}</body></html>`;
  }
}

// 2. L'enregistrer au démarrage (dans un module ou bootstrap)
pdfService.registerTemplate(PdfTemplate.CUSTOM, new AttestationTemplate());
```
