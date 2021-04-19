import {
    Model,
    DataTypes
} from 'sequelize';
import Sequelize from 'sequelize';
import {PostgresDatabase} from "../database/postgres_db";
import {User} from "./user";

export class CompanyProfile extends Model {

    public id!: number;
    public name!: string;
    public city!: string;
    public zipCode!: string;
    public street!: string;
    public state!: string;
    public email!: string;
    public logoUrl!: string;
    public address!: string;
    public websiteUrl!: string;

    public date_created!: Date;
    public date_updated!: Date;
}


CompanyProfile.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        city: {
            type: new DataTypes.STRING,
            allowNull: true
        },
        zipCode: {
            type: Sequelize.STRING,
            allowNull: false
        },
        street: {
            type: Sequelize.STRING,
            allowNull: false
        },
        state: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        logoUrl: {
            type: Sequelize.STRING,
            allowNull: false
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        websiteUrl: {
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
        tableName: "company_profile",
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
        sequelize: new PostgresDatabase().getSequelize // this bit is important
    }
);

User.hasMany(CompanyProfile, {
    foreignKey: "user_id",
    as: "user_company_profile"
});
