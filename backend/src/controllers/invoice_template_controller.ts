import {Request, Response} from "express";
import {ApiResponseUtil} from "../utils/api-response-util";
import {MyJWTObj} from "../interface/JWTObjInterface";
import AuthenticationService from "../service/authentication_service";
import {User} from "../models/user";
import {MyUtils} from "../utils/my_util";
import {UserDao} from "../dao/psql/user_dao";
import {InvoiceTemplateService} from "../service/invoice_template_service";
import {InvoiceTemplate} from "../models/invoice_template";

export class InvoiceTemplateController {

    static async index(req: Request, res: Response) {

        try {

            const response: MyJWTObj | null | Response = await AuthenticationService.getVerificationToken(req, res);

            if (response instanceof MyJWTObj) {
                const user: User | null = await UserDao.findUserForAuth(response.id);

                if (!user) {
                    return ApiResponseUtil.unAuthenticated(res);
                }

                const {page, limit}  = await MyUtils.getPaginationAndLimitParams(req.query.page, req.query.limit);

                const responseObj = await InvoiceTemplateService.findAllWithPaginationAndCount(user, page, limit);

                return ApiResponseUtil.apiResponseWithData(res,
                    200,
                    "Invoice template list",
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

                const creationResponse: InvoiceTemplate | Error = await InvoiceTemplateService.save(req, user);

                if(creationResponse instanceof InvoiceTemplate) {

                    return ApiResponseUtil.apiResponse(res,
                        200,
                        "Invoice template created successfully",
                        true);

                } else {

                    return ApiResponseUtil.apiResponse(res,
                        200,
                        creationResponse.message,
                        false);

                }
            }

            return ApiResponseUtil.unAuthenticated(res);

        } catch (e) {
            return ApiResponseUtil.InternalServerError(res, e);
        }
    }
}
