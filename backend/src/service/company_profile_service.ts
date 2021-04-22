import {CompanyProfileInterface} from "../interface/company_profile_interface";
import {CompanyProfileServiceInterface} from "../interface/company_profile_service_interface";
import {CompanyProfileDao} from "../dao/psql/company_profile_dao";
import {User} from "../models/user";
import {ApiResponseUtil} from "../utils/api-response-util";

export class CompanyProfileService {

    static async getRequestData(req: any, userId: number): Promise<CompanyProfileServiceInterface> {

        const { name, city, zipCode, street , state, email, logoUrl, address, websiteUrl, phoneNumber } = req.body;

        const date: Date = new Date();
        const objOne: CompanyProfileInterface = {
            name: name,
            city: city,
            zipCode: zipCode,
            street: street,
            state: state,
            email: email,
            logoUrl: logoUrl,
            address:  address,
            websiteUrl: websiteUrl,
            user_id: userId,
            date_created: date,
            date_updated: date
        };

        const output: CompanyProfileServiceInterface = {
            insertObj: objOne,
            phoneNumber: phoneNumber
        }

        return output;
    }

    static async findAllWithPaginationAndCount(user: User, page: number, limit: number) {
        const result: any[] = await CompanyProfileDao.findAllWithPagination(user.id, page, limit);

        console.log(result);
        // const newResult: any[] = [];
        // const resultLength: number = result.length;
        // for (let i = 0; i < resultLength; i++){
        //     const items = result[i]['dataValues'];
        //     const obj = Object.assign(items, {'loaded': false});
        //     newResult.push(obj);
        // }

        const count: number = await CompanyProfileDao.countAll(user.id);
        return  ApiResponseUtil.pagination(page, limit, count, []);
    }
}
