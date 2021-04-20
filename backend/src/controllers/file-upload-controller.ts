import {Request, Response} from "express";
import {ApiResponseUtil} from "../utils/api-response-util";
import {FileUploadService} from "../service/file_upload_service";
import {MyUtils} from "../utils/my_util";
import {MyJWTObj} from "../interface/JWTObjInterface";
import AuthenticationService from "../service/authentication_service";
import {User} from "../models/user";
import {UserDao} from "../dao/psql/user_dao";

export class FileUploadController {

    static async fileUpload(req: Request, res: Response) {

        try {

            const response: MyJWTObj | null | Response = await AuthenticationService.getVerificationToken(req, res);

            if(response instanceof MyJWTObj) {
                const user: User | null = await UserDao.findUserForAuth(response.id);

                if (!user) {
                    return ApiResponseUtil.unAuthenticated(res);
                }

                const pathToFileObj: null | object | Error = await FileUploadService.renameFile(req);
                if(pathToFileObj instanceof Error) {
                    return ApiResponseUtil.apiResponse(res,
                        200,
                        "Images uploaded failed",
                        false);
                }

                const urls = await FileUploadService.uploadFile(pathToFileObj, user);

                return ApiResponseUtil.apiResponseWithData(res,
                    200,
                    "Images successfully uploaded",
                    true,
                    urls);
            }

            return ApiResponseUtil.unAuthenticated(res);

        } catch (e) {
            return ApiResponseUtil.InternalServerError(res, e);
        }
    }
}
