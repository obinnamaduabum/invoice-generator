import {PhoneNumber} from "../../models/phone_number";

export class PhoneNumberDao {

    static async create(phoneNumber: string, companyProfileId: number, transaction: any) {
        const phoneNumberObj = this.getPhoneNumberInsertObj(phoneNumber);
        const response = this.getInputObjectForPhoneNumber(phoneNumberObj, companyProfileId);
        return PhoneNumber.create(response, {transaction: transaction});
    }

    static async findAll(companyProfileId: number) {
        return PhoneNumber.findAll({
            where: {'company_profile_id': companyProfileId}
        });
    }

    static getPhoneNumberInsertObj(phoneNumber: string) {
        return  {
            phone_number: phoneNumber,
            code: "",
        };
    }

    static getInputObjectForPhoneNumber(phoneNumberObj: any, companyProfileId: number) {
        const date: Date = new Date();
        const input = Object.assign(phoneNumberObj, {
            'company_profile_id': companyProfileId,
            date_created: date,
            date_updated: date});

        return input;
    }

}
