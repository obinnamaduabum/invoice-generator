import {MyLogo} from "../../models/my_logo";
import {Transaction} from "sequelize";
import {PostgresDatabase} from "../../database/postgres_db";

export class LogoDao {

    static async findAll(offset: number, limit: number, userId: number) {
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


    static async countAll(userId: number) {
        try {
            return MyLogo.count({
                where: {
                    user_id: userId
                }
            });
        } catch (e) {
            console.log(e);
            throw e;
        }
    }


    static async save(urls: any[], userId: number) {
        try {

            let transaction: Transaction;

            transaction = await new PostgresDatabase().getSequelize.transaction();

            let mainPromises: any[] = [];

            const date: Date =  new Date();

            for(let i = 0; i < urls.length; i++){
                const url = urls[i];
                const myLogo = {
                    code: "",
                    url: url,
                    user_id: userId,
                    date_created: date,
                    date_updated: date
                };
                const userTransactionObject = await MyLogo.create(myLogo, {transaction: transaction});
                mainPromises.push(userTransactionObject);
            }


            await Promise.all(mainPromises);
            await transaction.commit();
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}
