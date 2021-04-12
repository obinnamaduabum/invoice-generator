import {
    Model,
    DataTypes, HasOneGetAssociationMixin, HasOneSetAssociationMixin, Association,
} from 'sequelize';
import Sequelize from 'sequelize';
import {PostgresDatabase} from "../database/postgres_db";
import {User} from "./user";

export class MyLogo extends Model {

    public id!: number;
    public code!: string;
    public url!: string;

    public getUser!: HasOneGetAssociationMixin<User>; // Note the null assertions!
    public setUser!: HasOneSetAssociationMixin<User, number>;
    public readonly users?: User[]; // Note this is optional since it's only populated when explicitly requested in code

    public static associations: {
        users: Association<MyLogo, User>;
    };

    public date_created!: Date;
    public date_updated!: Date;
}


MyLogo.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        code: {
            type: new DataTypes.STRING,
            allowNull: true
        },
        url: {
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
        tableName: "logo",
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
        sequelize: new PostgresDatabase().getSequelize // this bit is important
    }
);
