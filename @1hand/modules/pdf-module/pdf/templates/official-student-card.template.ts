import { PdfTemplateContract } from '../pdf.types';

export interface OfficialStudentCardData {
  students: {
    nom: string;
    prenom: string;
    classe: string;
    annee: string;
    matricule: string;
    dateNaissance?: string;
    lieuNaissance?: string;
    sexe?: string;
    nationalite?: string;
    photo?: string;
    schoolName?: string;
    schoolLogo?: string;
    signaturePrincipal?: string;
  }[];
  cardsPerPage?: number;
  schoolName?: string;
  schoolLogo?: string;
  signaturePrincipal?: string;
  cameroonFlag?: string;
}

export class OfficialStudentCardTemplate
  implements PdfTemplateContract<OfficialStudentCardData>
{
  render(data: OfficialStudentCardData): string {
    const {
      students,
      cardsPerPage = 10,
      schoolName,
      schoolLogo,
      signaturePrincipal,
      cameroonFlag,
    } = data;

    const chunkArray = <T>(arr: T[], size: number): T[][] =>
      Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size),
      );

    const pages = chunkArray(students, cardsPerPage);

    const renderCard = (s: OfficialStudentCardData['students'][0]) => {
      const finalSchoolName =
        s.schoolName || schoolName || 'ÉTABLISSEMENT SCOLAIRE';
      const finalSchoolLogo = s.schoolLogo || schoolLogo;
      const finalSignature = signaturePrincipal;
      const finalFlag = cameroonFlag || '/images/cm-flag.png';

      return `
      <div class="card">

        <!-- HEADER -->
        <div class="header">
          <div class="header-left">
            <p class="republic-text">REPUBLIQUE DU CAMEROUN</p>
            <p class="motto-text">Paix - Travail - Patrie</p>
            <img class="flag" src="${finalFlag}" />
          </div>

          <div class="header-center">
            ${
              finalSchoolLogo
                ? `<img class="school-logo-main" src="${finalSchoolLogo}" />`
                : ''
            }
          </div>

          <div class="header-right">
            <p class="republic-text">REPUBLIC OF CAMEROON</p>
            <p class="motto-text">Peace - Work - Fatherland</p>
            <img class="flag" src="${finalFlag}" />
          </div>
        </div>

        <div class="ministry">MINISTÈRE DES ENSEIGNEMENTS SECONDAIRES</div>
        <div class="school-name">${finalSchoolName}</div>

        <!-- TITLE -->
        <div class="card-title">
          <div class="title-main">CARTE D'IDENTITÉ SCOLAIRE</div>
          <div class="title-sub">STUDENT ID CARD</div>
        </div>

        <!-- BODY -->
        <div class="card-body">

          <!-- PHOTO -->
          <div class="photo-section">
            ${
              s.photo
                ? `<img class="student-photo" src="${s.photo}" />`
                : `<div class="photo-placeholder"></div>`
            }
          </div>

          <!-- INFOS -->
          <div class="info-section">

            <!-- LEFT -->
            <div class="info-left">

              <div class="field">
                <span class="label">Nom / Name</span>
                <span class="value-bold">${s.nom}</span>
              </div>

              <div class="field">
                <span class="label">Prénom / First Name</span>
                <span class="value-bold">${s.prenom}</span>
              </div>

              <div class="row">
                <div class="field">
                  <span class="label">Né(e) le / Born on</span>
                  <span class="value">${s.dateNaissance || ''}</span>
                </div>

                <div class="field">
                  <span class="label">à / at</span>
                  <span class="value">${s.lieuNaissance || ''}</span>
                </div>
              </div>

              <div class="field">
                <span class="label">Sexe / Sex</span>
                <span class="value">${s.sexe || ''}</span>
              </div>

              <div class="field">
                <span class="label">Nationalité / Nationality</span>
                <span class="value">${s.nationalite || 'CAMEROUNAISE'}</span>
              </div>

            </div>

            <!-- RIGHT -->
            <div class="info-right">

              <div class="field">
                <span class="label">Matricule / ID</span>
                <span class="value-bold">${s.matricule}</span>
              </div>

              <div class="field">
                <span class="label">Classe / Class</span>
                <span class="value">${s.classe}</span>
              </div>

              <!-- SIGNATURE -->
              <div class="principal-section">
                <p class="principal-label">LE PRINCIPAL</p>
                ${
                  finalSignature
                    ? `<img class="signature" src="${finalSignature}" />`
                    : `<div class="signature-placeholder"></div>`
                }
              </div>

            </div>

          </div>
        </div>

        <!-- FOOTER -->
        <div class="academic-year">
          <div class="year-main">ANNÉE SCOLAIRE ${s.annee}</div>
          <div class="year-sub">Academic Year</div>
        </div>

      </div>
      `;
    };

    const renderPage = (group: OfficialStudentCardData['students'][0][]) => `
      <div class="page">
        ${group.map(renderCard).join('')}
      </div>
    `;

    return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8" />
      <style>

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body { font-family: Arial, sans-serif; }

        .page {
          width: 210mm;
          height: 297mm;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(5, 1fr);
          gap: 3mm;
          padding: 5mm;
          page-break-after: always;
        }

        .card {
          border: 1.5px solid #9ca3af;
          border-radius: 6px;
          padding: 4mm;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2mm;
        }

        .header-left, .header-right {
          flex: 1;
          font-size: 6.5px;
        }

        .header-right {
          text-align: right;
        }

        .header-center {
          margin: 0 3mm;
        }

        .flag {
          width: 14px;
          margin-top: 1mm;
        }

        .school-logo-main {
          width: 25px;
        }

        .ministry, .school-name {
          text-align: center;
          font-size: 7px;
          font-weight: bold;
          text-transform: uppercase;
        }

        .card-title {
          background: #2563eb;
          color: white;
          text-align: center;
          padding: 1mm;
          margin: 2mm 0;
        }

        .title-main {
          font-size: 7.5px;
          font-weight: bold;
        }

        .title-sub {
          font-size: 5.5px;
        }

        .card-body {
          display: flex;
          gap: 3mm;
          flex: 1;
          position: relative;
        }

        .photo-section {
          width: 22mm;
          border-right: 1px solid #9ca3af;
        }

        .student-photo {
          width: 100%;
          max-height: 26mm;
          object-fit: cover;
        }

        .info-section {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2mm;
        }

        .field {
          display: flex;
          flex-direction: column;
          margin-bottom: 1mm;
        }

        .label {
          font-size: 6px;
          color: #1d4ed8;
          font-weight: 600;
        }

        .value {
          font-size: 6.5px;
          font-weight: 600;
        }

        .value-bold {
          font-size: 6.5px;
          font-weight: bold;
          text-transform: uppercase;
        }

        .row {
          display: flex;
          gap: 2mm;
        }

        .principal-section {
          position: absolute;
          top: 2mm;
          right: -2mm;
          text-align: center;
        }

        .signature {
          width: 20mm;
        }

        .principal-label {
          font-size: 6px;
          font-weight: bold;
          margin-bottom: 1mm;
        }

        .academic-year {
          position: absolute;
          bottom: 1mm;
          left: 4mm;
        }

        .year-main {
          font-size: 6.5px;
          font-weight: bold;
        }

        .year-sub {
          font-size: 5px;
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
