export class GenerateHtmlForPdf {

    static async createHTML(item: any) {

        try {

            const createHtml = (table: any) => `
            <html lang="en">
                <head>
                    <style>
                        table {
                              font-family: arial, sans-serif;
                              border-collapse: collapse;
                              width: 100%;
                        }
    
                        td, th {
                          border: 1px solid #dddddd;
                          text-align: left;
                          padding: 8px;
                        }
                        
                        tr:nth-child(even) {
                          background-color: #dddddd;
                        }
                        
                        .tableHeader {
                          background-color: #05338f;
                          color: #ffffff;
                        }
                        
                        .float-container {
                          padding: 5px;
                          width: 100%;
                        }
                        
                        .float-child {
                          width: 48%;
                          float: left;
                          padding: 5px;
                        }
                        
                        
                        .div-child-one {
                          width: 58%;
                          float: left;
                          padding: 5px;
                        }
                        
                        
                        .div-child-two {
                          width: 38%;
                          float: left;
                          padding: 5px;
                        }
                        
                        .company-info {
                          font-size: 12px;
                          font-style: italic;
                        }
                        
                        div p, a {
                          font-family: sans, serif;
                        }
                        
                        /*@font-face {*/
                        /*  font-family: sans;*/
                        /*  src: url('../../../../assets/fonts/NotoSans-Regular.ttf');*/
                        /*}*/
                        
                        .invoice-due-date table tr, .invoice-due-date table td, .invoice-due-date table th {
                          text-align: left;
                          margin: 0px;
                          padding: 0px;
                          border: none;
                          background-color: transparent;
                        }
                        
                        p {
                          font-size: 12px;
                        }
                        
                        
                        .bill-to {
                          background-color: #05338f;
                          color: #ffffff;
                          padding: 5px;
                        }
                        
                        .float-right {
                          float: right
                        }
                        
                        .logo-image {
                          width: 90px;
                        }
                        
                        .company-name-padding {
                          padding: 5px;
                        }

                    </style>
                   
                </head>
                <body>
                  ${table}
                </body>
            </html>`;

            return createHtml(item);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    static async generatePDFPuppeteer(items: string, outPutPath: string) {
        try {

            //Html creator with css
            const htmlData = await GenerateHtmlForPdf.createHTML(items);
            if (!htmlData) {
                return false;
            }

            // we are using headless mode
            // const puppeteer = require('puppeteer-core');
            const puppeteer = require('puppeteer');

            let headlessChromeUrl = "";

            if (process.env.HEADLESS_CHROME_URL) {
                headlessChromeUrl = process.env.HEADLESS_CHROME_URL;
            }

            const browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox']
            });

            // const browser = await puppeteer.launch();
            const page = await browser.newPage();

            await page.setDefaultNavigationTimeout(0);
            // We set the page content as the generated html by handlebars
            await page.setContent(htmlData);

            // we Use pdf function to generate the pdf in the same folder as this file.

            // let headerDiv = `<div style="text-align: center;width: 297mm; font-size: 8px;">
            //                         <img style="width: 60px; height: auto" src="${MyUtils.readImageForPuppeteer(this.logo)}" alt="logo">
            //                         <img style="width: 90px; height: auto; padding-left: 10px" src="${MyUtils.readImageForPuppeteer(this.detailsLogo)}" alt="logo-details">
            //                     </div>`;

            //const footerDiv = `<div style="text-align: right;width: 297mm; font-size: 8px;"><span style="margin-right: 1cm"><span class="pageNumber"></span> of <span class="totalPages"></span></span></div>`;

            await page.pdf({
                path: outPutPath,
                format: 'Letter',
                displayHeaderFooter: true,
                printBackground: true,
                margin: {
                    top: '100px',
                    bottom: '100px',
                    right: '30px',
                    left: '30px',
                }
            });

            await browser.close();
            console.log("PDF Generated");
            return true;

        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}
