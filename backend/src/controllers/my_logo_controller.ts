import {Request, Response} from "express";
import {MyJWTObj} from "../interface/JWTObjInterface";
import AuthenticationService from "../service/authentication_service";
import {User} from "../models/user";
import {ApiResponseUtil} from "../utils/api-response-util";
import {MyUtils} from "../utils/my_util";
import {LogoService} from "../service/logo_service";
import {UserDao} from "../dao/psql/user_dao";

export class MyLogoController {

    static async index(req: Request, res: Response) {

        try {

            const {page, limit}  = await MyUtils.getPaginationAndLimitParams(req.query.page, req.query.limit);

            const response: MyJWTObj | null | Response = await AuthenticationService.getVerificationToken(req, res);

            if(response instanceof MyJWTObj) {
                const user: User | null = await UserDao.findUserForAuth(response.id);

                if(!user) {
                    return ApiResponseUtil.unAuthenticated(res);
                }

                return await LogoService.response(res, page, limit, user);
            }

            return response;

        } catch (e) {
            return ApiResponseUtil.InternalServerError(res, e);
        }
    }
}
