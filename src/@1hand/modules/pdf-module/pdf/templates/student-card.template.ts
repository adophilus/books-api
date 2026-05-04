import { PdfTemplateContract, StudentCardData } from '../pdf.types';

export class StudentCardTemplate
  implements PdfTemplateContract<StudentCardData>
{
  render(data: StudentCardData): string {
    const { students, cardsPerPage = 10, schoolName, schoolLogo } = data;

    const chunkArray = <T>(arr: T[], size: number): T[][] =>
      Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size),
      );

    const pages = chunkArray(students, cardsPerPage);

    const renderCard = (s: StudentCardData['students'][0]) => `
      <div class="card">
        <div class="card-header">
          ${
            s.schoolLogo || schoolLogo
              ? `<img class="school-logo" src="${
                  s.schoolLogo || schoolLogo
                }" alt="logo" />`
              : '<div class="school-logo-placeholder"></div>'
          }
          <div class="school-info">
            <span class="school-name">${
              s.schoolName || schoolName || 'Établissement'
            }</span>
            <span class="card-label">CARTE SCOLAIRE</span>
          </div>
        </div>
        <div class="card-body">
          ${
            s.photo
              ? `<img class="student-photo" src="${s.photo}" alt="photo" />`
              : '<div class="student-photo-placeholder"><span>Photo</span></div>'
          }
          <div class="student-info">
            <p class="student-name">${s.prenom} ${s.nom}</p>
            <p class="student-detail"><strong>Classe :</strong> ${s.classe}</p>
            <p class="student-detail"><strong>Année :</strong> ${s.annee}</p>
            ${
              s.matricule
                ? `<p class="student-detail"><strong>Matricule :</strong> ${s.matricule}</p>`
                : ''
            }
          </div>
        </div>
      </div>
    `;

    const renderPage = (group: StudentCardData['students'][0][]) => `
      <div class="page">
        <div class="cards-container">
          ${group.map(renderCard).join('')}
        </div>
      </div>
    `;

    return `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <style>
          * { 
            margin: 0; 
            padding: 0; 
            box-sizing: border-box; 
          }

          body { 
            font-family: 'Arial', sans-serif; 
            background: #fff;
            margin: 0;
            padding: 0;
          }

          /* Page A4 exacte */
          .page {
            width: 210mm;
            height: 297mm;
            padding: 10mm;
            page-break-after: always;
            position: relative;
            margin: 0 auto;
            background: white;
          }

          /* Conteneur des cartes avec grille 2x5 */
          .cards-container {
            display: grid;
            grid-template-columns: repeat(2, 85mm);
            grid-template-rows: repeat(5, 55mm);
            gap: 5mm; /* Espacement de 5mm entre les cartes pour faciliter la découpe */
            width: 100%;
            height: 100%;
          }

          /* Carte au format exact 85mm x 55mm (format carte de crédit) */
          .card {
            width: 85mm;
            height: 55mm;
            border: 1.5px solid #2c3e50;
            border-radius: 4mm;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            background: #fff;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }

          /* En-tête de la carte */
          .card-header {
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            color: #fff;
            display: flex;
            align-items: center;
            gap: 3mm;
            padding: 2mm 3mm;
            height: 12mm;
            flex-shrink: 0;
          }

          .school-logo {
            width: 8mm;
            height: 8mm;
            object-fit: contain;
            border-radius: 50%;
            background: #fff;
            padding: 0.5mm;
            flex-shrink: 0;
          }

          .school-logo-placeholder {
            width: 8mm;
            height: 8mm;
            border-radius: 50%;
            background: rgba(255,255,255,0.2);
            flex-shrink: 0;
          }

          .school-info {
            display: flex;
            flex-direction: column;
            gap: 0.5mm;
            flex: 1;
            overflow: hidden;
          }

          .school-name {
            font-size: 3mm;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.3mm;
            line-height: 1.2;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .card-label {
            font-size: 2.5mm;
            opacity: 0.9;
            text-transform: uppercase;
            letter-spacing: 0.5mm;
            line-height: 1.2;
          }

          /* Corps de la carte */
          .card-body {
            display: flex;
            gap: 3mm;
            padding: 3mm;
            flex: 1;
            align-items: center;
            background: linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%);
          }

          /* Photo de l'élève */
          .student-photo {
            width: 18mm;
            height: 24mm;
            object-fit: cover;
            border-radius: 2mm;
            border: 1px solid #ddd;
            flex-shrink: 0;
            box-shadow: 0 1px 3px rgba(0,0,0,0.15);
          }

          .student-photo-placeholder {
            width: 18mm;
            height: 24mm;
            border: 1px dashed #aaa;
            border-radius: 2mm;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            background: #f5f5f5;
          }

          .student-photo-placeholder span {
            font-size: 2.5mm;
            color: #999;
          }

          /* Informations de l'élève */
          .student-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 1.5mm;
            overflow: hidden;
          }

          .student-name {
            font-size: 3.5mm;
            font-weight: bold;
            color: #2c3e50;
            text-transform: uppercase;
            line-height: 1.2;
            margin-bottom: 1mm;
            word-wrap: break-word;
          }

          .student-detail {
            font-size: 2.8mm;
            color: #555;
            line-height: 1.3;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .student-detail strong {
            color: #2c3e50;
            font-weight: 600;
          }

          /* Marques de découpe (optionnelles) */
          .card::before,
          .card::after {
            content: '';
            position: absolute;
            background: #ccc;
          }

          @media print {
            .page { 
              page-break-after: always;
              margin: 0;
            }
            
            @page {
              size: A4;
              margin: 0;
            }
            
            body {
              margin: 0;
              padding: 0;
            }
          }
        </style>
      </head>
      <body>
        ${pages.map(renderPage).join('')}
      </body>
      </html>
    `;
  }
}
