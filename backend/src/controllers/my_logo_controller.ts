import {Request, Response} from "express";
import {MyJWTObj} from "../interface/JWTObjInterface";
import AuthenticationService from "../service/authentication_service";
import {User} from "../models/user";
import {ApiResponseUtil} from "../utils/api-response-util";
import {LogoDao} from "../dao/psql/logo_dao";
import {MyUtils} from "../utils/my_util";

export class MyLogoController {

    static async index(req: Request, res: Response) {

        try {

            const {page, limit}  = await MyUtils.getPaginationAndLimitParams(req.query.page, req.query.limit);

            const response: MyJWTObj | null | Response = await AuthenticationService.getVerificationToken(req, res);

            if(response instanceof MyJWTObj) {
                const user: User | null = await User.findOne({
                    where: {code: response.id}
                });

                if(!user) {
                    return ApiResponseUtil.unAuthenticated(res);
                }

                const logoList = await LogoDao.index(page, limit, user.id);

                let arrayOfObj: any[] = [];
                for(let r = 0; r < logoList.length; r++) {
                    const obj = logoList[r];
                    obj['loaded'] = false;


                    let newObj = {
                        id: obj['id'],
                        code: obj['code'],
                        url: obj['url'],
                        date_created: obj['date_created'],
                        date_updated: obj['date_updated'],
                        user_id: obj['user_id'],
                        loaded: false
                    }
                    console.log(newObj);
                    arrayOfObj.push(newObj);
                }

                //console.log(arrayOfObj);


                const paginationObj = ApiResponseUtil.pagination(page, limit, arrayOfObj);

                return ApiResponseUtil.apiResponseWithData(res,
                    200,
                    'List of Logos',
                    true,
                    paginationObj);
            }

            return response;

        } catch (e) {
            return ApiResponseUtil.InternalServerError(res, e);
        }
    }
}
