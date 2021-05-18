import * as fs from "fs";
import moment from "moment";

export class DownloadService {

    static async createDownloadResponse(res: any, outputPath: string, deleteList: string[]) {

        try {

            const file = await fs.createReadStream(outputPath);

            const year = new Date().getFullYear();
            const month = new Date().getMonth();
            const day = new Date().getDay();
            const getCurrentTime = new Date().getTime().toString().slice(0, 5);

            // const code = MyUtils.formatString("{0}{1}{2}{3}", year.toString(),
            //     month.toString(), day.toString(), getCurrentTime);

            // const pdfName = postType.toLowerCase() + "-Report-" + code;
            //
            // const captialized = MyUtils.capitalizeWords(pdfName);

            //const fileSize = await MyUtils.checkFileSize(outputPath);
            const stat = fs.statSync(outputPath);
            res.setHeader('Content-Length', stat.size);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=' + "captialized" + '.pdf');

            deleteList.push(outputPath);

            file.pipe(res);

            setTimeout(() => {
                //delete files
                deleteList.forEach(fileUrl => {
                    fs.unlink(fileUrl, (err: any) => {
                        if (err) {
                            console.log('could\'nt find file to delete');
                            throw err;
                        }
                    });
                });
            }, 10);
        } catch (e) {
            console.log(e);
            throw e;
        }

    }

    static getTableHtml(rows: any[], columns: any[]) {

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

    static formatDate(date: Date) {
        console.log(date);
        // 'YYYY-MM-DD HH:mm:ss'
        const result = moment(date).format('YYYY-MM-DD');
        // const result = date.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'});
        console.log(result);
        return result;
    }

    static getCompanyAndClient(company: any, client: any, otherInvoiceInfo: any) {

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


    static spitOutHtml(dataOne, dataTwo, table) {
       return `<div ="">${dataOne}</div>
        <div>${dataTwo}</div>
        <div>${table}</div>`
    }
}
