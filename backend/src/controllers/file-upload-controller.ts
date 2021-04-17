import {Request, Response} from "express";
import {ApiResponseUtil} from "../utils/api-response-util";

export class FileUploadController {

    static async fileUpload(req: Request, res: Response) {

        try {

        } catch (e) {
            return ApiResponseUtil.InternalServerError(res, e);
        }
    }
}
