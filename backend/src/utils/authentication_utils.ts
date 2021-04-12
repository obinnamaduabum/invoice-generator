import * as jwt from "jsonwebtoken";
import {resolve} from "path";
import {NextFunction, Request, Response} from 'express';
import {ApiResponseUtil} from "./api-response-util";
import {COOKIE_NAME} from "./auth_utils";
import {JWTObjInterface, MyJWTObj} from "../interface/JWTObjInterface";
const fs = require('fs');

export class AuthenticationUtils {

    private static privateKeyUrl = resolve(__dirname, "../assets/security/private.pem");
    private static publicKeyUrl = resolve(__dirname, "../assets/security/public.pem");

    private static verifyOptions: any = {
        issuer: 'http://' + process.env.DOMAIN_ONE,
        subject: 'cccc',
        audience: 'ccc',
        expiresIn: "365d",
        algorithm: ["RS256"]
    };

    private static generateOptions: any = {
        issuer: 'http://' + process.env.DOMAIN_ONE,
        subject: 'cccc',
        audience: 'ccc',
        expiresIn: "365d",
        algorithm: "RS256"
    };


    static generateToken(userCode: any) {
        let privateKey = fs.readFileSync(this.privateKeyUrl, 'utf8');
        return jwt.sign({"id": userCode}, privateKey, this.generateOptions);
    }


    static async verifyToken(req: Request): Promise<MyJWTObj | null> {

        let token: string;
        let envCookieName = process.env.COOKIE_NAME;

        if (envCookieName) {

            let cookie = req.cookies;

            if (cookie) {
                if (cookie[envCookieName]) {
                    let token = cookie[envCookieName];

                    if (token) {
                        return this.performVerification(token);
                    }
                }
            }
        }

        if (req.headers) {
            if (req.headers.authorization) {
                if (req.headers.authorization.split(" ")[1]) {
                    token = req.headers.authorization.split(" ")[1];
                    return await this.performVerification(token);
                }

                return null;
            }
        }

        return null;
    }



    static async performVerification(token: string): Promise<JWTObjInterface | null> {
        try {

            let publicKey = fs.readFileSync(this.publicKeyUrl, 'utf8');
            const response: any = jwt.verify(token, publicKey, this.verifyOptions);
            return new MyJWTObj(response);
        } catch (e) {
            return null;
        }
    }

    static async checkIfAuthenticated(req: Request, res: Response, next: NextFunction) {

        try {

            const verifyToken = await AuthenticationUtils.verifyToken(req);

            if (verifyToken) {
                return next();
            } else {
                return ApiResponseUtil.unAuthenticated(res);
            }

        } catch (e) {
            return ApiResponseUtil.unAuthenticated(res);
        }
    }

    static setCookie(token: string, res: Response, _hostName: string, _req: Request) {
        let cookieName = process.env.COOKIE_NAME;
        if (!cookieName) {
            cookieName = COOKIE_NAME;
        }
        // const options = {expiresIn: '365d', httpOnly: true};
        const options = {maxAge: 1000 * 60 * 60 * 24 * 30 * 12, httpOnly: true};

        return res.cookie(cookieName, token, options);
    }


    static logoutSetCookie(res: Response, req: Request) {
        let cookieName = process.env.COOKIE_NAME;
        if (!cookieName) {
            cookieName = COOKIE_NAME;
        }

        const origin = req.headers.origin;

        const options = {expires: new Date(0)};
        res.cookie(cookieName, '/', options);
        return res.status(200).send({
            success: true,
            message: 'Logout successful',
        });
    }
}
