import {
    Model,
    DataTypes, Association, HasOneSetAssociationMixin, HasOneGetAssociationMixin,
} from 'sequelize';
import Sequelize from 'sequelize';
import {PostgresDatabase} from "../database/postgres_db";
import {MyLogo} from "./my_logo";

export class User extends Model {

    public id!: number;
    public email!: string;
    public password!: string;
    public code!: string;
    public active!: boolean;
    public blocked!: boolean;
    public failedLoginAttemptCount!: number;
    public lastFailedLoginAttemptDate!: Date;

    public date_created!: Date;
    public date_updated!: Date;
}


User.init(
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
            type: new DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
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
        tableName: "portal_user",
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
        sequelize: new PostgresDatabase().getSequelize // this bit is important
    }
);
