import {resolve} from "path";
import {Transaction} from "sequelize";
import {PostgresDatabase} from "../../database/postgres_db";
import {UserDao} from "../../dao/psql/user_dao";
import {User} from "../../models/User";
import {MyUtils} from "../../utils/my_util";
import {MySequenceTypeConstant} from "../../lh_enum/sequence_type";
import {BcryptPasswordUtil} from "../../utils/bcrypt-password-util";

const fs = require('fs');

export class AddUser {

    static async add() {

        let transaction: Transaction;

        transaction = await new PostgresDatabase().getSequelize.transaction();

        try {

            const path = resolve(__dirname, "../../assets/json/user.json");
            let rawData = fs.readFileSync(path);
            let userInterface: any = JSON.parse(rawData);

            const foundUser = await UserDao.checkIfEmailExists(userInterface.email.trim());

            if (foundUser) {
                console.log('User account already exists');
                return null;
            }

            let mainPromises: any[] = [];

            const date = new Date();

            const code = await MyUtils.generateCode('user', MySequenceTypeConstant.USER_ID);
            const encryptedPassword = await BcryptPasswordUtil.encrypt(userInterface.password);
            const user = {
                email: userInterface.email,
                password: encryptedPassword,
                code: code,
                active: true,
                blocked: false,
                failedLoginAttemptCount: null,
                lastFailedLoginAttemptDate: null,
                date_created: date,
                date_updated: date
            }

            const userTransactionObject = await User.create(user, {transaction: transaction});
            mainPromises.push(userTransactionObject);

            await Promise.all(mainPromises);
            await transaction.commit();

        } catch (e) {
            await transaction.rollback();
            console.log(e);
        }
    }
}
