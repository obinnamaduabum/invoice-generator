import {resolve} from "path";
import {DownloadService} from "../service/download_service";
import {MyUtils} from "../utils/my_util";
import * as os from "os";
import {MyJWTObj} from "../interface/JWTObjInterface";
import {Request, Response} from "express";
import AuthenticationService from "../service/authentication_service";
import {User} from "../models/user";
import {UserDao} from "../dao/psql/user_dao";
import {ApiResponseUtil} from "../utils/api-response-util";
import {GenerateHtmlForPdf} from "../utils/generate_html_pdf_util";

export class PdfController {

    static async exportPDF(req: Request, res: Response) {

        try {

            const response: MyJWTObj | null | Response = await AuthenticationService.getVerificationToken(req, res);

            if (response instanceof MyJWTObj) {
                const user: User | null = await UserDao.findUserForAuth(response.id);

                if (!user) {
                    return ApiResponseUtil.unAuthenticated(res);
                }

                const {client, company, columns, rows, invoiceObj} = req.body;

                const table = DownloadService.getTableHtml(rows, columns);

                const {dataTwo, dataOne} = DownloadService.getCompanyAndClient(company, client, invoiceObj);

                let url = `${__dirname}../../assets/pdf_generation_template`;

                let outputPath = "";

                if (process.env.NODE_ENV === 'development') {
                    outputPath = resolve(url + '/output/' + MyUtils.randomString(10) + "-" + user.id + '.pdf');
                } else {
                    outputPath = os.tmpdir() + '/' + MyUtils.randomString(10) + "-" + user.id + '.pdf';
                }

                /// loading new html
                const htmlResult: any | null = await DownloadService.spitOutHtml(dataOne, dataTwo, table);

                if (htmlResult) {
                    const resultPDF: boolean = await GenerateHtmlForPdf.generatePDFPuppeteer(htmlResult, outputPath)

                    if (resultPDF) {
                        const deleteList: string[] = [];
                        return await DownloadService.createDownloadResponse(res, outputPath, deleteList);
                    }

                    return null;
                }

                return null;
            }
        } catch (e) {
            console.log(e);
            return null;
        }

    }
}
