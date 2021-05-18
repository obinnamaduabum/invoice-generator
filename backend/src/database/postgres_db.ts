import { Sequelize } from "sequelize";
import * as fs from "fs";
import * as path from "path";
import {User} from "../models/user";
import {MyLogo} from "../models/my_logo";
import {CompanyProfile} from "../models/company_profile";
import {PhoneNumber} from "../models/phone_number";
import {MyClient} from "../models/client";

// if(!process.env.PG_DATABASE) {
//     throw "Database Configuration properties not found";
// }
export class PostgresDatabase {
    postgresDatabase: Sequelize;

    constructor() {
            this.postgresDatabase = new Sequelize({
            username: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            database: process.env.PG_DATABASE,
            host: process.env.PG_HOST,
            dialect: "postgres",
            logging: false,
            pool: {
                max: 120,
                min: 5,
                idle: 20000,
                evict: 15000,
                acquire: 6000000
            }
        });
    }

    getLoggingStatus() {
        return process.env.NODE_ENV === 'development';
    }

    async checkConnection() {
        try {
            await this.postgresDatabase.authenticate();
            console.log('Connection has been established successfully.');
        } catch (err) {
            console.log('Unable to connect to the database:', err);
            console.log(err);
        }
    }

    async sync() {
      return await this.postgresDatabase.sync({alter: false, force: false});
    }

    get getSequelize(): Sequelize {
        return this.postgresDatabase;
    }


    // async syncAllTables() {
    //     const db = {};
    //     const models = path.resolve(__dirname, "../models");
    //     const myThis = this;
    //     fs.readdirSync(models).filter(function (file) {
    //             return (file.indexOf('.') !== 0)  && (file.slice(-3) === '.js' || '.ts')
    //         }).forEach(function (file) {
    //             console.log(file);
    //             let model = myThis.postgresDatabase.model(path.join(models, file));
    //             console.log(model.name);
    //             // db[model.name] = model
    //         })
    //
    //     Object.keys(db).forEach(function (modelName) {
    //         if (db[modelName].associate) {
    //             db[modelName].associate(db)
    //         }
    //     });
    // }
}




