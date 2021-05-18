import {Injectable} from '@angular/core';
import {jsPDF} from "jspdf";
import * as handlebars from "handlebars";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  a4 = [595.28, 841.89];

  constructor() {}

  getTableHtml(rows: any[], columns: any[]) {

    //th
    let thList: any = "";
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      const thValue = column['value'];
      const th = `<th>${thValue}</th>`;
      thList += th;
    }
    const thArray = `<tr class="tableHeader">${thList}</tr>`
    //th

    let tdList: any = "";
    for (let i = 0; i < rows.length; i++) {

      const row = rows[i];
      let tdArray = "";
      for (let i = 0; i < columns.length; i++) {
        const columnName = columns[i]['value'];
        const tdValue = row[columnName];
        const td = `<td>${tdValue}</td>`;
        tdArray += td;
      }

      const tr = `<tr>${tdArray}</tr>`
      tdList += tr;

    }

    const table = `<table>${thArray}${tdList}</table>`;
    return table;
  }

  formatDate(date: Date) {
    console.log(date);
    // 'YYYY-MM-DD HH:mm:ss'
    const result = moment(date).format('YYYY-MM-DD');
    // const result = date.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'});
    console.log(result);
    return result;
  }

  getCompanyAndClient(company: any, client: any, otherInvoiceInfo: any) {

    ///console.log(company);
    console.log(client);

    const dataOne = `<div class="float-container">
        <div class="div-child-one">
            <div>
              <span>
                <img class="logo-image" src="${company['logoUrl']}"  alt="logo"/>
              </span>
              <span class="company-name-padding">
                <h2>${company['name']}</h2>
              </span>
              <p class="company-info">${company['city']} ${company['state']} ${company['zipCode']}</p>
              <p class="company-info">${company['state']}</p>
              <p class="company-info">${company['email']}</p>
            </div>
        </div>
        <div class="div-child-two">
        <div class="float-right">
            <h3 style="font-size: 30px">INVOICE</h3>
            <div class="invoice-due-date">
              <table>
              <tr>
                <td>
                  <p>Date: </p>
                </td>
                <td>
                   <p>${this.formatDate(otherInvoiceInfo['date'])}</p>
                </td>
            </tr>
            <tr>
              <td>
                <p>Invoice: </p>
              </td>
              <td>
                  <p> ${otherInvoiceInfo['invoiceNumber']}</p>
              </td>
          </tr>
          <tr>
            <td>
              <p>Due Date: </p>
            </td>
            <td>
              <p><p> ${this.formatDate(otherInvoiceInfo['dueDate'])}</p></p>
            </td>
          </tr>
          </table>
            </div>
          </div>
        </div>
    </div>`;


    // <p>Company Name: ${client['name']}</p>
    const dataTwo = `<div class="float-container">
    <div class="float-child">
      <div class="bill-to">BILL TO</div>
        <div style="padding-left: 10px">
          <p>Receipt Name: ${client['name']}</p>
          <p>Address: ${client['address']}</p>
      </div>
    </div>
    </div>`;

    return {
      dataOne,
      dataTwo
    }
  }

  generateHtml(rows: any[], columns: any[], company: any, client: any, otherInvoiceInfo: any) {


    const table = this.getTableHtml(rows, columns);
    const { dataOne, dataTwo} = this.getCompanyAndClient(company, client, otherInvoiceInfo);

    const result = `<!DOCTYPE html>
                        <html lang="en">
                          <head>
                              <meta charset="UTF-8">
                              <title>Title</title>
                              <link rel="stylesheet" href="css/index.css">
                          </head>
                          <body>
                            ${dataOne}
                            ${dataTwo}
                            ${table}
                          </body>
                        </html>`;


    return result;

  }


  createPdf(replacements: any, rows: any[], columns: any[], company: any, client: any, otherInvoiceInfo: any) {

    const result = this.generateHtml(rows, columns, company, client, otherInvoiceInfo);
    const template = handlebars.compile(result);
    const htmlToSend = template(replacements);
    console.log(htmlToSend);

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "in",
      format: [4, 2]
    });

    // doc.html(result).then(r => {
    //   console.log(r);
    // });
    doc.text("Hello world!", 10, 10);
    doc.save("two-by-four.pdf");

  }
}
