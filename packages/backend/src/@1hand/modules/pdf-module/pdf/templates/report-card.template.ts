import { PdfTemplateContract, ReportCardData } from '../pdf.types';

export class ReportCardTemplate implements PdfTemplateContract<ReportCardData> {
  private esc(value: any): string {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  render(data: ReportCardData): string {
    const {
      school,
      student,
      periodLabel,
      reportTitle,
      leftHeader,
      rightHeader,
      centerSealText,
      periods = [],
      rows = [],
      totals,
      averages,
      stats,
      decision,
      mention,
      absences,
      punishments,
      recap = [],
      principalSignature,
      generatedAt,
    } = data;

    // ✅ FIX PRINCIPAL : on NE retrie PAS les périodes ici.
    // Le service a déjà fourni les périodes dans le bon ordre (period.order).
    // Le re-tri par kind (SEQUENCE=1, TERM=2, YEAR=3) écrasait cet ordre
    // et mettait toutes les SEQUENCE avant les TERM, sans respecter S1/S2/T1.
    const orderedPeriods = [...periods];

    console.log('[ORRRRRRRRRRRDORED]===========>', orderedPeriods);

    const renderPeriodHeadersTop = () =>
      orderedPeriods
        .map(
          (p) => `
            <th colspan="2" class="${
              p.kind === 'SEQUENCE' ? 'period-sequence' : 'period-term'
            }">
              ${this.esc(p.name)}
            </th>
          `,
        )
        .join('');

    const renderPeriodHeadersBottom = () =>
      orderedPeriods
        .map(
          (p) => `
            <th class="${
              p.kind === 'SEQUENCE' ? 'period-sequence' : 'period-term'
            }">Note<br />Grade</th>
            <th class="${
              p.kind === 'SEQUENCE' ? 'period-sequence' : 'period-term'
            }">${
            p.kind === 'TERM' ? 'Appreciation' : 'Note×Coef<br />Grade×Weight'
          }</th>
          `,
        )
        .join('');

    const renderRows = () =>
      rows
        .map((row) => {
          const periodCells = orderedPeriods
            .map((p) => {
              const cell = (row as any).values?.[p.id] || {};
              console.log('[[[[[[[[', p.id, p.name, cell);
              return `
                <td class="center">${this.esc(cell.grade ?? '-')}</td>
                <td class="center">${
                  p.kind == 'TERM'
                    ? this.esc((row as any).appreciation)
                    : this.esc(cell.weighted ?? '-')
                }</td>
                
              `;
            })
            .join('');

          return `
            <tr>
              <td class="subject-cell">${this.esc((row as any).subject)}</td>
              <td class="skills-cell">${this.esc(
                (row as any).skills || '',
              )}</td>
              <td class="center">${this.esc(
                (row as any).coefficient ?? '',
              )}</td>
              ${periodCells}
              
            </tr>
          `;
        })
        .join('');

    const renderTotalsCells = () =>
      orderedPeriods
        .map((p) => {
          const val = totals?.perPeriod?.[p.id]?.total ?? '-';
          return `<td colspan="2" class="center">${this.esc(val)}</td>`;
        })
        .join('');

    const renderAverageCells = () =>
      orderedPeriods
        .map((p) => {
          const avg = averages?.perPeriod?.[p.id]?.average ?? '-';
          const rank = averages?.perPeriod?.[p.id]?.rank ?? '-';
          return `
            <td class="blue center">Moy: ${this.esc(avg)}</td>
            <td class="center">Rang: ${this.esc(rank)}</td>
          `;
        })
        .join('');

    const renderRecap = () =>
      recap.length
        ? recap
            .map(
              (item) => `
              <tr>
                <td>${this.esc(item.label)}</td>
                <td class="center">${this.esc(item.average ?? '-')}</td>
                <td class="center">${this.esc(item.rank ?? '-')}</td>
              </tr>
            `,
            )
            .join('')
        : `
          <tr>
            <td>Aucune donnée / No data</td>
            <td class="center">-</td>
            <td class="center">-</td>
          </tr>
        `;

    return `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <title>${this.esc(reportTitle || 'Bulletin de notes')}</title>
        <style>
          * {
            box-sizing: border-box;
            font-family: Arial, sans-serif;
          }

          @page {
            size: A4 portrait;
            margin: 8mm;
          }

          html, body {
            margin: 0;
            padding: 0;
            color: #111;
            background: #fff;
            font-size: 11px;
            line-height: 1.2;
          }

          .page { width: 100%; }

          table { width: 100%; border-collapse: collapse; }

          th, td {
            border: 1px solid #999;
            padding: 2px 4px;
            vertical-align: middle;
          }

          .no-border,
          .no-border td,
          .no-border th { border: none !important; }

          .center { text-align: center; }
          .right { text-align: right; }
          .bold { font-weight: bold; }
          .italic { font-style: italic; }
          .blue { color: #1a56db; font-weight: bold; }
          .small { font-size: 9px; }
          .tiny { font-size: 8px; }

          .header-table { margin-bottom: 6px; }

          .header-cell {
            width: 33%;
            text-align: center;
            vertical-align: top;
            padding: 0;
          }

          .seal-cell {
            width: 34%;
            text-align: center;
            vertical-align: middle;
            padding: 0;
          }

          .seal {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 72px;
            height: 72px;
            font-weight: bold;
            font-size: 13px;
            overflow: hidden;
          }

          .seal img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }

          .title-block {
            text-align: center;
            margin-bottom: 6px;
          }

          .title-school { font-size: 12px; }
          .title-main { font-size: 15px; font-weight: bold; }

          .student-table { margin-bottom: 4px; }

          .photo-box {
            width: 72px;
            height: 88px;
            text-align: center;
            font-weight: bold;
            vertical-align: middle;
            overflow: hidden;
            padding: 0;
          }

          .photo-box img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }

          .marks-table { margin-bottom: 4px; }

          .marks-table thead th {
            background: #e8eaf0;
            font-size: 10px;
          }

          .period-sequence { background: #d6e4f7 !important; }
          .period-term { background: #fef9e7 !important; }

          .subject-cell { font-weight: bold; width: 18%; }
          .skills-cell { width: 12%; }

          .totals-row td { background: #e8eaf0; font-weight: bold; }
          .average-row td { background: #dbeafe; font-weight: bold; }

          .stats-table,
          .decision-table,
          .recap-table { margin-bottom: 6px; }

          .section-title { font-weight: bold; margin-bottom: 3px; }
          .footer-table { margin-top: 6px; }

          .signature-box {
            text-align: center;
            vertical-align: top;
            height: 80px;
          }

          .signature-image {
            height: 38px;
            margin: 6px auto 4px;
            display: block;
            object-fit: contain;
          }

          .signature-line {
            width: 120px;
            border-top: 1px solid #000;
            margin: 8px auto 0;
          }

          .generated-at {
            text-align: right;
            font-size: 8px;
            color: #666;
            margin-top: 4px;
          }
        </style>
      </head>
      <body>
        <div class="page">
          <table class="header-table no-border">
            <tr>
              <td class="header-cell">
                <div class="bold">${this.esc(
                  leftHeader?.country || 'RÉPUBLIQUE DU CAMEROUN',
                )}</div>
                <div class="italic">${this.esc(
                  leftHeader?.motto || 'Paix - Travail - Patrie',
                )}</div>
                <div class="bold">${this.esc(
                  leftHeader?.ministry ||
                    "MINISTÈRE DE L'ENSEIGNEMENT SECONDAIRE",
                )}</div>
                <div>${this.esc(
                  leftHeader?.contact || school?.address || '',
                )}</div>
              </td>

              <td class="seal-cell">
                <div class="seal">
                  ${
                    school?.logo
                      ? `<img src="${this.esc(school.logo)}" alt="logo" />`
                      : this.esc(centerSealText || school?.shortName || 'MCD')
                  }
                </div>
              </td>

              <td class="header-cell">
                <div class="bold">${this.esc(
                  rightHeader?.country || 'REPUBLIC OF CAMEROON',
                )}</div>
                <div class="italic">${this.esc(
                  rightHeader?.motto || 'Peace - Work - Fatherland',
                )}</div>
                <div class="bold">${this.esc(
                  rightHeader?.ministry || 'MINISTRY OF SECONDARY EDUCATION',
                )}</div>
                <div>${this.esc(
                  rightHeader?.contact || school?.address || '',
                )}</div>
              </td>
            </tr>
          </table>

          <div class="title-block">
            <div class="title-school">${this.esc(school?.name || '')}</div>
            <div class="title-main">${this.esc(
              reportTitle || 'BULLETIN DE NOTE / REPORT CARD',
            )} ${this.esc(periodLabel || '')}</div>
          </div>

          <table class="student-table">
            <tr>
              <td colspan="5" class="bold">Nom / Name : ${this.esc(
                student?.fullName ||
                  `${student?.nom || ''} ${student?.prenom || ''}`,
              )}</td>
            </tr>
            <tr>
              <td rowspan="3" class="photo-box">
                ${
                  student?.photo
                    ? `<img src="${this.esc(student.photo)}" alt="photo" />`
                    : 'PHOTO'
                }
              </td>
              <td class="no-border">Matricule / ID : ${this.esc(
                student?.matricule || '',
              )}</td>
              <td class="no-border">Sexe / Sex : ${this.esc(
                student?.gender || '',
              )}</td>
              <td class="no-border"><strong>Classe / Class : ${this.esc(
                student?.classe || '',
              )}</strong></td>
              <td class="no-border">Effectif / Enrollment : ${this.esc(
                student?.enrollment ?? '',
              )}</td>
            </tr>
            <tr>
              <td class="no-border">Né(e) le / Born on : ${this.esc(
                student?.birthDate || '-- --',
              )}</td>
              <td class="no-border">Lieu / Place : ${this.esc(
                student?.birthPlace || '-- --',
              )}</td>
              <td colspan="2" class="no-border">Nationalité / Nationality : ${this.esc(
                student?.nationality || '',
              )}</td>
            </tr>
            <tr>
              <td class="no-border">Parent / Guardian : ${this.esc(
                student?.guardian || '-- --',
              )}</td>
              <td colspan="2" class="no-border">Redoublant / Repeating : ${this.esc(
                student?.repeating || 'Non / No',
              )}</td>
              <td class="no-border">Prof titulaire / Class Master : ${this.esc(
                student?.classMaster || '-- --',
              )}</td>
            </tr>
          </table>

          <table class="marks-table">
            <thead>
              <tr>
                <th rowspan="2">Matière<br />Subject</th>
                <th rowspan="2">Compétences<br />Skills</th>
                <th rowspan="2">Coef<br />Weight</th>
                ${renderPeriodHeadersTop()}
              </tr>
              <tr>
                ${renderPeriodHeadersBottom()}
              </tr>
            </thead>
            <tbody>
              ${renderRows()}

              <tr class="totals-row">
                <td colspan="2" class="right">
                  TOTAL<br /><span class="small" style="font-weight: normal;">Total</span>
                </td>
                <td class="center">${this.esc(totals?.coefficient ?? '')}</td>
                ${renderTotalsCells()}
                <td></td>
              </tr>

              <tr class="average-row">
                <td colspan="2" class="right">
                  MOYENNE / RANG<br />
                  <span class="small" style="font-weight: normal;">Average / Rank</span>
                </td>
                <td></td>
                ${renderAverageCells()}
                <td></td>
              </tr>
            </tbody>
          </table>

          <table class="stats-table">
            <tr>
              <td style="width:20%"><strong>1er : ${this.esc(
                stats?.highestAverage ?? '0.00',
              )}</strong><br /><span class="small">Highest Avg</span></td>
              <td style="width:20%"><strong>Dernier : ${this.esc(
                stats?.lowestAverage ?? '0.00',
              )}</strong><br /><span class="small">Lowest Avg</span></td>
              <td style="width:20%"><strong>Admis : ${this.esc(
                stats?.passed ?? '0',
              )}</strong><br /><span class="small">Passed</span></td>
              <td style="width:20%"><strong>Taux : ${this.esc(
                stats?.passRate ?? '0.00%',
              )}</strong><br /><span class="small">Pass Rate</span></td>
              <td style="width:20%"><strong>Moy. Classe : ${this.esc(
                stats?.classAverage ?? '0.00',
              )}</strong><br /><span class="small">Class Avg</span></td>
            </tr>
          </table>

          <table class="decision-table">
            <tr>
              <td style="width:22%">Décision : ${this.esc(
                decision || '-',
              )}<br /><span class="small">Decision</span></td>
              <td style="width:22%"><span class="blue">Mention : ${this.esc(
                mention || 'NA',
              )}</span><br /><span class="small">Grade</span></td>
              <td style="width:28%">Absences : ${this.esc(
                absences || '0 h',
              )}<br /><span class="small">Absences</span></td>
              <td style="width:28%">Punitions : ${this.esc(
                punishments || '0',
              )}<br /><span class="small">Punishments</span></td>
            </tr>
          </table>

          <div class="section-title">RÉCAPITULATIF TRAVAIL DE L'ÉLÈVE / STUDENT'S WORK SUMMARY</div>
          <table class="recap-table">
            <thead>
              <tr style="background:#e8eaf0">
                <th style="text-align:left; width:75%">Trimestre / Séquence<br /><span class="small" style="font-weight: normal;">Term / Sequence</span></th>
                <th class="center" style="width:12.5%">Moy. / 20<br /><span class="small" style="font-weight: normal;">Avg / 20</span></th>
                <th class="center" style="width:12.5%">Rang<br /><span class="small" style="font-weight: normal;">Rank</span></th>
              </tr>
            </thead>
            <tbody>
              ${renderRecap()}
            </tbody>
          </table>

          <table class="footer-table no-border">
            <tr>
              <td class="signature-box">
                <div>Parent</div>
                <div style="height: 42px;"></div>
                <div class="signature-line"></div>
              </td>
              <td class="signature-box">
                <div>Principal</div>
                <div style="height: 42px;"></div>
                <div class="signature-line"></div>
              </td>
            </tr>
          </table>

         
        </div>
      </body>
      </html>
    `;
  }
}
