import {User} from "../models/user";
import {MyUtils} from "../utils/my_util";
import {BcryptPasswordUtil} from "../utils/bcrypt-password-util";
import {AuthenticationUtils} from "../utils/authentication_utils";
import {UserDao} from "../dao/psql/user/user_dao";
import {Request, Response} from 'express';
import {MyJWTObj} from "../interface/JWTObjInterface";
import {ApiResponseUtil} from "../utils/api-response-util";

class AuthenticationService {


    static async numberOfRemainingLoginAttempts(user: User, failedLoginCountInt: number) {
        const newCount = user.failedLoginAttemptCount + 1;
        let query = {};

        if (newCount >= failedLoginCountInt) {
            query = {
                blocked: true,
                failedLoginAttemptCount: newCount,
                lastFailedLoginAttemptDate: new Date()
            };
        } else {
            query = {
                failedLoginAttemptCount: newCount,
                lastFailedLoginAttemptDate: new Date()
            };
        }


        await User.update(query, {where: {code: user.code}});
        return failedLoginCountInt - newCount;
    }

    static async getFailedLoginHoursToActivate(showString: boolean) {
        const failedLoginHoursToActivation = process.env.FAILED_LOGIN_HOURS_TO_ACTIVATION;

        if (!failedLoginHoursToActivation) {
            throw new Error("Admin info required");
        }


        if(showString) {
            return failedLoginHoursToActivation;
        }

       return parseInt(failedLoginHoursToActivation);

    }

    static async updateBlockedUser(user: User) {

        const failedLoginCountInt = await AuthenticationService.getFailedLoginCount();

        const failedLoginHoursToActivationInt = await AuthenticationService.getFailedLoginHoursToActivate(false);

        //update
        if (user.lastFailedLoginAttemptDate && user.failedLoginAttemptCount >= failedLoginCountInt) {
            // @ts-ignore
            const whenAccountWillBeReactivated = MyUtils.addHoursToDate(user.lastFailedLoginAttemptDate, failedLoginHoursToActivationInt);

            if (new Date() >= whenAccountWillBeReactivated) {
                await UserDao.unBlockUser(user.email);
            }
        }
    }

    static async getFailedLoginCount() {
        const failedLoginCountLimit = process.env.FAILED_LOGIN_COUNT_LIMIT;
        if (!failedLoginCountLimit) {
            throw new Error("Admin info required");
        }

        return parseInt(failedLoginCountLimit);
    }


    static async passwordCompare(req: any, res: any, password: string, user: User) {

        const compareResult = await BcryptPasswordUtil.compare(password, user.password);

        const failedLoginCountInt = await AuthenticationService.getFailedLoginCount();

        if (compareResult) {
            const token = AuthenticationUtils.generateToken(user.code);

            let hostName = '';
            if (req.headers.host) {
                hostName = req.headers.host;
            }

            AuthenticationUtils.setCookie(token, res, hostName, req);

            return res.status(200).send({
                success: true,
                message: 'token successfully generated',
                token
            });

        } else {

            const numberOfRemainingLoginAttempts =
            await AuthenticationService.numberOfRemainingLoginAttempts(user, failedLoginCountInt);

            return res.status(401).send({
                success: false,
                message: 'username or password is invalid, you have ' + numberOfRemainingLoginAttempts
                    + ' remaining login attempts',
            });
        }
    }


    static async getVerificationToken(req: Request, res: Response): Promise<MyJWTObj | Response | null> {
        const verifyToken: any = await AuthenticationUtils.verifyToken(req);

        if (verifyToken === null) {
            return ApiResponseUtil.unAuthenticated(res);
        }

        return verifyToken;
    }
}
export default AuthenticationService;
