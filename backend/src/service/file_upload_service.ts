import Formidable, {IncomingForm} from "formidable";
import {Request} from "express";
import {PCloud} from "../modules/pcloud/p-cloud";
import {MySequences} from "../utils/sequence_generator";
import {MySequenceTypeConstant} from "../lh_enum/sequence_type";
import {MyUtils} from "../utils/my_util";
import * as fs from "fs";
import {LogoDao} from "../dao/psql/logo_dao";
import {User} from "../models/user";
import {PCloudPublicLinkInterface} from "../interface/pcloud/public_link/pcloud_public_link";

export class FileUploadService {

    static async renameFile(req: Request): Promise<null | object | Error> {

        const form = new IncomingForm();
        const uniqueId = await MySequences.getSequenceId(MySequenceTypeConstant.FILE_ID);

        const year = new Date().getFullYear();
        const month = new Date().getMonth();
        const day = new Date().getDay();
        const getCurrentTime = new Date().getTime().toString().slice(0, 10);

        const fileCode = MyUtils.formatString(
            "{0}{1}{2}{3}{4}",
            year.toString(),
            month.toString(),
            day.toString(),
            uniqueId,
            getCurrentTime);

        return new Promise((resolve, reject) => {
            form.parse(req, async (err, fields, files: Formidable.Files) => {

                const dir = process.cwd();

                if(err){
                    console.log(err);
                    reject(err);
                }

                if(!MyUtils.isObjectEmpty(files)) {
                    const file: any = files['logo'];
                    const fileName: string = fileCode + '_' + file.name;
                    const path = dir + '/upload/' + fileName;
                    const oldPath = file.path;
                    const newPath = path;

                    const rawData = fs.readFileSync(oldPath);

                    file.path = path;
                    file.name = fileName;

                    await MyUtils.writeFile(newPath, rawData);

                    const responseObj = {
                        path: newPath,
                        code: fileCode
                    }
                    resolve(responseObj);
                }

                resolve(null);
            });
        });

        // return new Promise((resolve, reject) => {
        //
        //     form.on('fileBegin', (_name, file) => {

        //
        //         const dir = process.cwd();
        //         console.log(dir);
        //         console.log(file.name);
        //
        //         file.path = dir + '/uploads/' + fileCode + '_' + file.name;
        //         file.name = fileCode + '_' + file.name;
        //     });
        //
        //     form.on('file', async (name: any, file: any) => {
        //        resolve(file);
        //     });
        //
        //     // form.on('end', () => {
        //     //     res.json()
        //     // });
        //     // form.parse(req, () => {
        //     //
        //     // })
        //
        // });
    }


    static async uploadFile(pathToFile: any, user: User) {
        const fileUploadResponse = await new PCloud().fileUpload(pathToFile.path);
        const files: any[] = fileUploadResponse['data']['fileids'];
        const imgUrls: string[] = [];
        for (let i = 0; i < files.length; i++) {
            const obj: PCloudPublicLinkInterface = await new PCloud().getPublicFileUrl(files[i]);
            const url = await new PCloud().getThumbnailLink(obj.metadata.fileid, obj.code, obj.metadata.width, obj.metadata.height);
            imgUrls.push(url);
        }

        if(typeof pathToFile.path === "string") {
            console.log("delete file");
            await MyUtils.deleteFile(pathToFile.path);
        } else {
            console.log("error!!!!!");
        }

        await LogoDao.save(imgUrls, user.id);

        return imgUrls;
    }




}
