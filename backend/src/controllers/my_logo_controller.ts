import {Request, Response} from "express";
import {MyJWTObj} from "../interface/JWTObjInterface";
import AuthenticationService from "../service/authentication_service";
import {User} from "../models/user";
import {ApiResponseUtil} from "../utils/api-response-util";
import {LogoDao} from "../dao/psql/logo_dao";

export class MyLogoController {

    static async index(req: Request, res: Response) {

        try {

            console.log("Yay!...");
            const response: MyJWTObj | null | Response = await AuthenticationService.getVerificationToken(req, res);

            if(response instanceof MyJWTObj) {
                const user: User | null = await User.findOne({
                    where: {code: response.id}
                });

                if(!user) {
                    return ApiResponseUtil.unAuthenticated(res);
                }

                const logoList = await LogoDao.index(0, 10, user.id);


                return ApiResponseUtil.apiResponseWithData(res,
                    200,
                    'List of Logos',
                    true,
                    logoList);
            }

            return response;

        } catch (e) {
            return ApiResponseUtil.InternalServerError(res, e);
        }
    }
}
