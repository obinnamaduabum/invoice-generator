import {LogoDao} from "../dao/psql/logo_dao";
import {ApiResponseUtil} from "../utils/api-response-util";
import {User} from "../models/user";

export class LogoService {


    static async response(res: any, page: number, limit: number, user: User): Promise<any> {
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

            arrayOfObj.push(newObj);
        }

        const paginationObj = ApiResponseUtil.pagination(page, limit, arrayOfObj);

        return ApiResponseUtil.apiResponseWithData(res,
            200,
            'List of Logos',
            true,
            paginationObj);
    }

}
