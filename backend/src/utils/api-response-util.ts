

export class ApiResponseUtil {

    static InternalServerError(res, e) {
        console.log(e);
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            data: null
        });
    }

    static unAuthenticated(res) {
        return res.status(401).send({
            success: false,
            message: 'unauthenticated',
            data: null
        });
    }


    static apiResponse(res: any, code: number, message: string, success: boolean) {
        return res.status(code).send({
            success: success,
            message: message,
            data: null
        });
    }


    static apiResponseWithData(res: any, code: number, message: string, success: boolean, data: any) {
        return res.status(code).send({
            success: success,
            message: message,
            data: data
        });
    }


    static unAuthorized(res) {
        return ApiResponseUtil.apiResponse(res,
            401,
            "username or password is invalid",
            false);
    }

    static accountTypeNotPermitted(res) {
        return res.status(200).send({
            success: false,
            message: 'user not permitted',
            data: null
        });
    }

    static userNotSubscribed(res) {
        return res.status(200).send({
            success: false,
            message: 'User not subscribed',
            data: null
        });
    }
}
