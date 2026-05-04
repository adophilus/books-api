import { PdfTemplateContract, InvoiceData } from '../pdf.types';

export class InvoiceTemplate implements PdfTemplateContract<InvoiceData> {
  render(data: InvoiceData): string {
    const { invoiceNumber, date, dueDate, seller, buyer, items, subtotal, tax, taxRate, total, currency = 'FCFA', notes } = data;

    const renderItem = (item: InvoiceData['items'][0], index: number) => `
      <tr>
        <td class="center">${index + 1}</td>
        <td>${item.description}</td>
        <td class="right">${item.quantity}</td>
        <td class="right">${item.unitPrice.toLocaleString('fr-FR')} ${currency}</td>
        <td class="right bold">${item.total.toLocaleString('fr-FR')} ${currency}</td>
      </tr>
    `;

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
          }

          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 24px;
          }

          .seller-block img {
            height: 50px;
            margin-bottom: 8px;
          }

          .seller-name {
            font-size: 18px;
            font-weight: bold;
            color: #2c3e50;
          }

          .seller-details {
            font-size: 10px;
            color: #666;
            line-height: 1.6;
            margin-top: 4px;
          }

          .invoice-title-block {
            text-align: right;
          }

          .invoice-title-block h1 {
            font-size: 28px;
            font-weight: 800;
            color: #2c3e50;
            text-transform: uppercase;
            letter-spacing: 2px;
          }

          .invoice-number {
            font-size: 14px;
            color: #555;
            margin-top: 4px;
          }

          .invoice-date {
            font-size: 11px;
            color: #888;
            margin-top: 2px;
          }

          .parties {
            display: flex;
            gap: 24px;
            margin-bottom: 24px;
          }

          .party-box {
            flex: 1;
            background: #f8f9fa;
            border-left: 4px solid #2c3e50;
            padding: 12px;
            border-radius: 0 6px 6px 0;
          }

          .party-box h4 {
            font-size: 9px;
            text-transform: uppercase;
            color: #888;
            letter-spacing: 1px;
            margin-bottom: 6px;
          }

          .party-box p {
            font-size: 11px;
            line-height: 1.6;
          }

          .party-box .party-name {
            font-size: 14px;
            font-weight: bold;
            color: #2c3e50;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 16px;
          }

          thead tr {
            background: #2c3e50;
            color: #fff;
          }

          thead th {
            padding: 9px 10px;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          tbody tr:nth-child(even) { background: #f8f9fa; }

          tbody td {
            padding: 8px 10px;
            border-bottom: 1px solid #eee;
            font-size: 11px;
          }

          .center { text-align: center; }
          .right { text-align: right; }
          .bold { font-weight: bold; }

          .totals {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 20px;
          }

          .totals-table {
            width: 260px;
          }

          .totals-table td {
            padding: 5px 10px;
            font-size: 11px;
            border: none;
          }

          .totals-table .label { color: #666; }
          .totals-table .value { text-align: right; font-weight: 600; }

          .total-row {
            background: #2c3e50 !important;
            color: #fff;
            font-size: 13px !important;
            font-weight: bold;
          }

          .total-row td { border: none !important; padding: 8px 10px !important; }

          .notes {
            background: #fffde7;
            border: 1px solid #f9a825;
            border-radius: 6px;
            padding: 12px;
            font-size: 10px;
            color: #555;
            margin-top: 16px;
          }

          .notes h4 {
            font-size: 10px;
            text-transform: uppercase;
            color: #f9a825;
            margin-bottom: 4px;
          }

          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 9px;
            color: #aaa;
            border-top: 1px solid #eee;
            padding-top: 10px;
          }
        </style>
      </head>
      <body>
        <!-- En-tête -->
        <div class="header">
          <div class="seller-block">
            ${seller.logo ? `<img src="${seller.logo}" alt="logo" />` : ''}
            <div class="seller-name">${seller.name}</div>
            <div class="seller-details">
              ${seller.address}<br/>
              ${seller.email ? `${seller.email}<br/>` : ''}
              ${seller.phone ?? ''}
            </div>
          </div>
          <div class="invoice-title-block">
            <h1>Facture</h1>
            <div class="invoice-number">N° ${invoiceNumber}</div>
            <div class="invoice-date">Date : ${date}</div>
            ${dueDate ? `<div class="invoice-date">Échéance : ${dueDate}</div>` : ''}
          </div>
        </div>

        <!-- Parties -->
        <div class="parties">
          <div class="party-box">
            <h4>Émetteur</h4>
            <p class="party-name">${seller.name}</p>
            <p>${seller.address}</p>
          </div>
          <div class="party-box">
            <h4>Destinataire</h4>
            <p class="party-name">${buyer.name}</p>
            ${buyer.address ? `<p>${buyer.address}</p>` : ''}
            ${buyer.email ? `<p>${buyer.email}</p>` : ''}
          </div>
        </div>

        <!-- Tableau des articles -->
        <table>
          <thead>
            <tr>
              <th class="center" style="width:40px">#</th>
              <th>Description</th>
              <th class="right" style="width:60px">Qté</th>
              <th class="right" style="width:120px">Prix unitaire</th>
              <th class="right" style="width:120px">Total</th>
            </tr>
          </thead>
          <tbody>
            ${items.map((item, i) => renderItem(item, i)).join('')}
          </tbody>
        </table>

        <!-- Totaux -->
        <div class="totals">
          <table class="totals-table">
            <tr>
              <td class="label">Sous-total</td>
              <td class="value">${subtotal.toLocaleString('fr-FR')} ${currency}</td>
            </tr>
            ${tax !== undefined ? `
            <tr>
              <td class="label">TVA ${taxRate ? `(${taxRate}%)` : ''}</td>
              <td class="value">${tax.toLocaleString('fr-FR')} ${currency}</td>
            </tr>` : ''}
            <tr class="total-row">
              <td>Total TTC</td>
              <td style="text-align:right">${total.toLocaleString('fr-FR')} ${currency}</td>
            </tr>
          </table>
        </div>

        ${notes ? `
        <div class="notes">
          <h4>Notes</h4>
          <p>${notes}</p>
        </div>` : ''}

        <div class="footer">
          Document généré automatiquement — ${seller.name}
        </div>
      </body>
      </html>
    `;
  }
}
