import {User} from "../models/user";
import {InvoiceTemplateDao} from "../dao/psql/invoice_template_dao";
import {CompanyProfile} from "../models/company_profile";
import {MyClient} from "../models/client";
import {InvoiceTemplate} from "../models/invoice_template";
import {CompanyProfileDao} from "../dao/psql/company_profile_dao";
import {ClientDao} from "../dao/psql/client_dao";
import {ApiResponseUtil} from "../utils/api-response-util";
import {MyUtils} from "../utils/my_util";
import {PhoneNumberDao} from "../dao/psql/phone_number_dao";

export class InvoiceTemplateService {

    static async findAllWithPaginationAndCount(user: User, page: number, limit: number) {

        const result = await InvoiceTemplateDao.findAllWithPagination(user.id, page, limit);
        const count: number = await InvoiceTemplateDao.countAll(user.id);

        const newResult: any[] = [];
        const resultLength: number = result.length;
        for (let i = 0; i < resultLength; i++){
            const items = result[i]['dataValues'];
            const position = MyUtils.pageOffsetCalculator(page, limit, i);
            const companyProfileId: number = items['company_profile_id'];
            const phoneNumbers =  await PhoneNumberDao.findAll(companyProfileId);
            let companyProfile = items['CompanyProfile']['dataValues'];
            const client = items['MyClient']['dataValues'];
            const addedPhoneNumberWithObj = Object.assign(companyProfile, { phoneNumbers: phoneNumbers })

            delete items['CompanyProfile'];
            delete items['MyClient'];

            const obj = Object.assign(items, {
                loaded: false,
                position: position,
                companyProfile: addedPhoneNumberWithObj,
                client: client
            });

            newResult.push(obj);
        }

        return ApiResponseUtil.pagination(page, limit, count, newResult);

    }

    static async createRequest(req: any): Promise<any> {

        const {rows, name, company_name, client_email} = req.body;
        return  {
            rows,
            name,
            company_name,
            client_email
        }
    }

    static async save(req: any, user: User): Promise<Error | InvoiceTemplate > {

        const requestObj = await InvoiceTemplateService.createRequest(req);
        const companyProfile: CompanyProfile | null =
        await CompanyProfileDao.findByName(requestObj['company_name'], user.id);

        if(!companyProfile) {
            return new Error("Company profile not found");
        }

        const client: MyClient | null =
        await ClientDao.findByEmailAndUserId(requestObj['client_email'], user.id);

        if(!client) {
            return new Error("Client not found");
        }

        const date: Date = new Date();
        const inputObj = {
            rows: requestObj['rows'],
            name: requestObj['name'],
            date_created: date,
            date_updated: date
        }
        const obj = Object.assign(inputObj, {
            'user_id': user.id,
            'company_profile_id': companyProfile.id,
            'client_id': client.id
        });

        return InvoiceTemplateDao.save(obj);
    }

}
