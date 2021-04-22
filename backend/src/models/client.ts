import {
    Model,
    DataTypes
} from 'sequelize';
import Sequelize from 'sequelize';
import {PostgresDatabase} from "../database/postgres_db";
import {CompanyProfile} from "./company_profile";
import {PhoneNumber} from "./phone_number";
import {User} from "./user";

export class MyClient extends Model {
    public id!: number;
    public email!: string;
    public code!: string;
    public name!: string;
    public address!: string;
    public phoneNumber!: string;
    public date_created!: Date;
    public date_updated!: Date;
}


MyClient.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
            type: new DataTypes.STRING,
            allowNull: true
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: Sequelize.STRING,
            allowNull: false
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false
        },
        date_updated: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        tableName: "client",
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
        sequelize: new PostgresDatabase().getSequelize // this bit is important
    }
);

User.hasMany(MyClient, {
    foreignKey: "user_id",
    as: "user_clients"
});
