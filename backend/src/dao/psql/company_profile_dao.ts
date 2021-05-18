import {MyLogo} from "../../models/my_logo";
import Sequelize, {QueryTypes, Transaction} from "sequelize";
import {PostgresDatabase} from "../../database/postgres_db";
import {CompanyProfile} from "../../models/company_profile";
import {CompanyProfileServiceInterface} from "../../interface/company_profile_service_interface";
import {PhoneNumber} from "../../models/phone_number";
import {PhoneNumberDao} from "./phone_number_dao";

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

            return CompanyProfile.findAll({where: { user_id: userId }, offset: offset, limit: limit})

            // return await new PostgresDatabase().getSequelize.query('SELECT * from company_profile as cp' +
            //     ' LEFT JOIN phone_number as p on p.company_profile_id = cp.id ' +
            //     ' WHERE cp.user_id = :userId' +
            //     ' limit :limit offset :offset', {
            //     mapToModel: true,
            //     replacements: {
            //         userId: userId,
            //         offset: offset,
            //         limit: limit
            //     },
            //     type: QueryTypes.SELECT
            // });

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


    static async findByName(name: string, userId: number) {
        return CompanyProfile.findOne({
            where: {
                name: Sequelize.where(
                    Sequelize.fn('lower', Sequelize.col('name')),
                    Sequelize.fn('lower', name)
                ),
                user_id: userId
            }
        });
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
                    const phoneNumberInputObj =  await PhoneNumberDao.create(phoneNumber, companyProfileObj.id, transaction);
                    mainPromises.push(phoneNumberInputObj);
                }
            } else {

                if(typeof inputObj.phoneNumber === "string") {
                    const phoneNumber: string = inputObj.phoneNumber;
                    const phoneNumberInputObj =  await PhoneNumberDao.create(phoneNumber, companyProfileObj.id, transaction);
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
}
