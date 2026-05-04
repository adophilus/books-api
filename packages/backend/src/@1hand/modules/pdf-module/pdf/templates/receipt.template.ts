import { PdfTemplateContract, ReceiptData } from '../pdf.types';

export class ReceiptTemplate implements PdfTemplateContract<ReceiptData> {
  render(data: ReceiptData): string {
    const { receiptNumber, date, organization, payer, amount, currency = 'FCFA', reason, paymentMethod, notes } = data;

    return `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }

          body {
            font-family: 'Arial', sans-serif;
            font-size: 12px;
            color: #222;
            padding: 14mm 16mm;
            max-width: 148mm; /* A5 width */
          }

          .header {
            text-align: center;
            border-bottom: 3px double #2c3e50;
            padding-bottom: 12px;
            margin-bottom: 16px;
          }

          .header img { height: 50px; margin-bottom: 8px; }

          .org-name {
            font-size: 18px;
            font-weight: bold;
            color: #2c3e50;
          }

          .org-address {
            font-size: 10px;
            color: #666;
            margin-top: 4px;
          }

          .receipt-title {
            font-size: 22px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 3px;
            color: #2c3e50;
            text-align: center;
            margin: 12px 0 4px;
          }

          .receipt-number {
            text-align: center;
            font-size: 11px;
            color: #888;
            margin-bottom: 16px;
          }

          .amount-block {
            background: #2c3e50;
            color: #fff;
            border-radius: 8px;
            padding: 16px;
            text-align: center;
            margin-bottom: 20px;
          }

          .amount-label {
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
            opacity: 0.8;
          }

          .amount-value {
            font-size: 32px;
            font-weight: bold;
            margin: 4px 0;
          }

          .amount-currency {
            font-size: 12px;
            opacity: 0.8;
          }

          .details-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }

          .details-table tr td {
            padding: 8px 4px;
            border-bottom: 1px dashed #ddd;
            font-size: 11px;
          }

          .details-table .detail-label {
            color: #888;
            width: 40%;
          }

          .details-table .detail-value {
            font-weight: 600;
            color: #2c3e50;
          }

          .signature-section {
            display: flex;
            justify-content: space-between;
            margin-top: 24px;
            padding-top: 12px;
            border-top: 1px solid #ddd;
          }

          .sig-block {
            text-align: center;
          }

          .sig-label {
            font-size: 9px;
            color: #888;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 24px;
          }

          .sig-line {
            border-top: 1px solid #333;
            width: 100px;
            margin: 0 auto;
          }

          .notes {
            font-size: 10px;
            color: #888;
            font-style: italic;
            text-align: center;
            margin-top: 16px;
          }
        </style>
      </head>
      <body>
        <!-- En-tête organisation -->
        <div class="header">
          ${organization.logo ? `<img src="${organization.logo}" alt="logo" /><br/>` : ''}
          <div class="org-name">${organization.name}</div>
          ${organization.address ? `<div class="org-address">${organization.address}</div>` : ''}
        </div>

        <div class="receipt-title">Reçu de paiement</div>
        <div class="receipt-number">N° ${receiptNumber} — ${date}</div>

        <!-- Montant -->
        <div class="amount-block">
          <div class="amount-label">Montant perçu</div>
          <div class="amount-value">${amount.toLocaleString('fr-FR')}</div>
          <div class="amount-currency">${currency}</div>
        </div>

        <!-- Détails -->
        <table class="details-table">
          <tr>
            <td class="detail-label">Reçu de</td>
            <td class="detail-value">${payer.name}</td>
          </tr>
          ${payer.contact ? `
          <tr>
            <td class="detail-label">Contact</td>
            <td class="detail-value">${payer.contact}</td>
          </tr>` : ''}
          <tr>
            <td class="detail-label">Motif</td>
            <td class="detail-value">${reason}</td>
          </tr>
          ${paymentMethod ? `
          <tr>
            <td class="detail-label">Mode de paiement</td>
            <td class="detail-value">${paymentMethod}</td>
          </tr>` : ''}
          <tr>
            <td class="detail-label">Date</td>
            <td class="detail-value">${date}</td>
          </tr>
        </table>

        ${notes ? `<div class="notes">${notes}</div>` : ''}

        <!-- Signatures -->
        <div class="signature-section">
          <div class="sig-block">
            <div class="sig-label">Signature du caissier</div>
            <div class="sig-line"></div>
          </div>
          <div class="sig-block">
            <div class="sig-label">Signature du payeur</div>
            <div class="sig-line"></div>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}
