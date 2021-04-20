import {MyLogo} from "../../models/my_logo";
import {Transaction} from "sequelize";
import {PostgresDatabase} from "../../database/postgres_db";
import {CompanyProfile} from "../../models/company_profile";
import {CompanyProfileServiceInterface} from "../../interface/company_profile_service_interface";
import {PhoneNumber} from "../../models/phone_number";

export class CompanyProfileDao {

    static async index(offset: number, limit: number, userId: number) {
        try {
            return MyLogo.findAll({
                where: {
                    user_id: userId
                },
                offset: offset,
                limit: limit,
                order: [
                    ['date_created', 'DESC'],
                ],
            });
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    static async findAllWithPagination(userId: number, offset: number, limit: number) {

        try {
            return await CompanyProfile.findAll({
                where: {
                    user_id: userId
                },
                offset: offset,
                limit: limit,
                order: [
                    ['date_created', 'DESC'],
                ],
            });
        } catch (e) {
            console.log(e);
            throw e;
        }
    }


    static async countAll(userId: number) {
        try {
            return await CompanyProfile.count({
                where: {
                    user_id: userId
                }
            });
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    static async save(inputObj: CompanyProfileServiceInterface) {

        let transaction: Transaction;

        transaction = await new PostgresDatabase().getSequelize.transaction();

        try {

            let mainPromises: any[] = [];

            const companyProfileObj =
            await CompanyProfile.create(inputObj.insertObj, {transaction: transaction});
            mainPromises.push(companyProfileObj);

            if (Array.isArray(inputObj.phoneNumber)) {
                const phoneNumbers: string[] = inputObj.phoneNumber;
                for (let i = 0; i < phoneNumbers.length; i++) {
                    const phoneNumber = phoneNumbers[i];
                    const phoneNumberObj = this.getPhoneNumberInsertObj(phoneNumber, companyProfileObj.id);
                    const phoneNumberInputObj = await PhoneNumber.create(phoneNumberObj, {transaction: transaction});
                    mainPromises.push(phoneNumberInputObj);
                }
            } else {

                if(typeof inputObj.phoneNumber === "string") {
                    const phoneNumber: string = inputObj.phoneNumber;
                    const phoneNumberObj = this.getPhoneNumberInsertObj(phoneNumber, companyProfileObj.id);

                    const phoneNumberInputObj = await PhoneNumber.create(phoneNumberObj, {transaction: transaction});
                    mainPromises.push(phoneNumberInputObj);
                } else {
                    return new Error("Phone number required");
                }
            }

            await Promise.all(mainPromises);
            await transaction.commit();
        } catch (e) {
            console.log(e);
            await transaction.rollback();
            throw e;
        }
    }


    static async getPhoneNumberInsertObj(phoneNumber: string, companyProfileId: number) {
        const date: Date = new Date();
        const phoneNumberObj = {
            phoneNumber: phoneNumber,
            code: "",
            date_created: date,
            date_updated: date,
            company_profile_id: companyProfileId
        };

        return phoneNumberObj;
    }
}
