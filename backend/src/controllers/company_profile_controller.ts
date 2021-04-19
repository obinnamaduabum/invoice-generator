import {Request, Response} from "express";
import {ApiResponseUtil} from "../utils/api-response-util";
import {CompanyProfileDao} from "../dao/psql/company_profile_dao";
import {MyJWTObj} from "../interface/JWTObjInterface";
import AuthenticationService from "../service/authentication_service";
import {User} from "../models/user";
import {CompanyProfileService} from "../service/company_profile_service";
import {CompanyProfileServiceInterface} from "../interface/company_profile_service_interface";

export class CompanyProfileController {

    static async index(req: Request, res: Response) {

        try {

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

                const companyProfile: CompanyProfileServiceInterface =
                await CompanyProfileService.getRequestData(req, user.id);

                await CompanyProfileDao.save(companyProfile);

                return ApiResponseUtil.apiResponse(res,
                    200,
                    "Company profile successfully created",
                    true);
            }

            return ApiResponseUtil.unAuthenticated(res);

        } catch (e) {
            return ApiResponseUtil.InternalServerError(res, e);
        }
    }
}
