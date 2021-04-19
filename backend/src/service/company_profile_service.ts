import {CompanyProfileInterface} from "../interface/company_profile_interface";
import {CompanyProfileServiceInterface} from "../interface/company_profile_service_interface";

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
}
