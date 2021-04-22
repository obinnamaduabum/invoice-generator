import {Request, Response} from "express";
import { ApiResponseUtil } from "../utils/api-response-util";
import { MyJWTObj } from "../interface/JWTObjInterface";
import AuthenticationService from "../service/authentication_service";
import { User } from "../models/user";
import { MyUtils } from "../utils/my_util";
import { UserDao } from "../dao/psql/user_dao";
import { ClientService } from "../service/client_service";

export class ClientListController {

    static async index(req: Request, res: Response) {

        try {

            const response: MyJWTObj | null | Response = await AuthenticationService.getVerificationToken(req, res);

            if (response instanceof MyJWTObj) {
                const user: User | null = await UserDao.findUserForAuth(response.id);

                if (!user) {
                    return ApiResponseUtil.unAuthenticated(res);
                }

                const {page, limit}  = await MyUtils.getPaginationAndLimitParams(req.query.page, req.query.limit);

                const responseObj = await ClientService.findAllWithPaginationAndCount(user, page, limit);

                return ApiResponseUtil.apiResponseWithData(res,
                    200,
                    "Client list",
                    true,
                    responseObj);
            }

            return ApiResponseUtil.unAuthenticated(res);

        } catch (e) {
            return ApiResponseUtil.InternalServerError(res, e);
        }
    }

    static async create(req: Request, res: Response) {

        try {

            const response: MyJWTObj | null | Response = await AuthenticationService.getVerificationToken(req, res);

            if (response instanceof MyJWTObj) {
                const user: User | null = await User.findOne({
                    where: {code: response.id}
                });

                if (!user) {
                    return ApiResponseUtil.unAuthenticated(res);
                }

                const requestObj = await ClientService.getRequest(req);
                await ClientService.save(requestObj, user.id);

                return ApiResponseUtil.apiResponse(res,
                    200,
                    "Client successfully added",
                    true);
            }

            return ApiResponseUtil.unAuthenticated(res);

        } catch (e) {
            return ApiResponseUtil.InternalServerError(res, e);
        }
    }
}
