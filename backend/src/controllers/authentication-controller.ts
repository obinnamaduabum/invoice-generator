import {body} from "express-validator";
import {Request, Response} from 'express';
import {ApiResponseUtil} from "../utils/api-response-util";
import {AuthenticationUtils} from "../utils/authentication_utils";
import {User} from "../models/User";
import AuthenticationService from "../service/authentication_service";
import {UserDao} from "../dao/psql/user/user_dao";
import {JWTObjInterface, MyJWTObj} from "../interface/JWTObjInterface";

export class AuthenticationController {

    static validate(method: string) {
        if (method === 'validateUserCredentials') {
            {
                return [
                    body('username', 'username or email or phone number required').exists(),
                    body('password', 'password required').exists()
                ]
            }
        }
    };

    static async logOut(req: Request, res: Response) {

        try {

            let cookie = req.cookies;

            for (let prop in cookie) {
                if (!cookie.hasOwnProperty(prop)) {
                    continue;
                }

                const options = {expires: new Date(0), httpOnly: true};
                // {expires: new Date(0)}
                res.cookie(prop, '', options);
            }

            // return AuthenticationUtils.logoutSetCookie(res, req);

            return res.status(200).send({
                success: true,
                message: 'Logout successful',
            });

        } catch (e) {

            return ApiResponseUtil.InternalServerError(res, e);
        }
    }

    static async me(req: Request, res: Response) {

        try {

            const response: MyJWTObj | null | Response = await AuthenticationService.getVerificationToken(req, res);
            if(response instanceof MyJWTObj) {
                console.log(response);
                const user: User | null = await User.findOne({
                    where: {code: response.id}
                });

                if (!user) {
                    return res.status(401).send({
                        success: false,
                        message: 'username or password is invalid',
                    });
                }

                if (!user.active && user.blocked) {
                    return res.status(200).send({
                        success: false,
                        message: 'Account not activated',
                        data: null
                    });
                }

                const userObj = {
                    id: user.id,
                    email: user.email,
                    code: user.code,
                };

                return res.status(200).send({
                    success: true,
                    message: 'user found',
                    data: userObj
                });

            } else if (response !== null) {
                return response;
            }

        } catch (e) {
            return ApiResponseUtil.InternalServerError(res, e);
        }
    }

    //Login
    static async authenticateUser(req: any, res: any) {

        const {email, password} = req.body;

        if (!email || !password) {
            return ApiResponseUtil.apiResponse(res,
                400,
                "username or password is required",
                false);
        }

        try {

            const user = await UserDao.findByEmail(email);

            if (!user) {
                return ApiResponseUtil.unAuthorized(res);
            }

            if (!user.active) {
                return ApiResponseUtil.apiResponse(res,
                    200,
                    "Account not activated",
                    false);
            }

            await AuthenticationService.updateBlockedUser(user);

            const failedLoginHoursToActivation: string | number = await AuthenticationService.getFailedLoginHoursToActivate(true);

            if (user.blocked) {
                return ApiResponseUtil.apiResponse(res,
                    200,
                    `Account blocked for ${failedLoginHoursToActivation} hours`,
                    false);
            }

            return AuthenticationService.passwordCompare(req, res, password, user);

        } catch (e) {

            return ApiResponseUtil.InternalServerError(res, e);
        }
    }
}
