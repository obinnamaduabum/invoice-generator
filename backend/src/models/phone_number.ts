import {
    Model,
    DataTypes,
} from 'sequelize';
import Sequelize from 'sequelize';
import {PostgresDatabase} from "../database/postgres_db";
import {CompanyProfile} from "./company_profile";

export class PhoneNumber extends Model {

    public id!: number;
    public phoneNumber!: string;
    public code!: string;

    public date_created!: Date;
    public date_updated!: Date;
}


PhoneNumber.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        phoneNumber: {
            type: Sequelize.STRING,
            allowNull: false
        },
        code: {
            type: new DataTypes.STRING,
            allowNull: true
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
        tableName: "phone_number",
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
        sequelize: new PostgresDatabase().getSequelize // this bit is important
    }
);

CompanyProfile.hasMany(PhoneNumber, {
    foreignKey: "company_profile_id",
    as: "company_phone_number"
});
