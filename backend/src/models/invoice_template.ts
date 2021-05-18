import Sequelize, {DataTypes, Model} from "sequelize";
import {PostgresDatabase} from "../database/postgres_db";
import {User} from "./user";
import {CompanyProfile} from "./company_profile";
import {MyClient} from "./client";

export class InvoiceTemplate extends Model {
    public id!: number;
    public name!: string;
    public rows!: string;
    public date_created!: Date;
    public date_updated!: Date;
}

InvoiceTemplate.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: new DataTypes.STRING,
            allowNull: true
        },
        rows: {
            type: DataTypes.JSONB,
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
        tableName: "invoice_template",
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
        sequelize: new PostgresDatabase().getSequelize // this bit is important
    }
);

User.hasMany(InvoiceTemplate, {
    foreignKey: "user_id",
    as: "user_invoice_template"
});

CompanyProfile.hasMany(InvoiceTemplate, {
    foreignKey: "company_profile_id",
    as: "company_profile_invoice_template"
});

MyClient.hasMany(InvoiceTemplate, {
    foreignKey: "client_id",
    as: "client_invoice_template"
});

InvoiceTemplate.belongsTo(CompanyProfile, {
    foreignKey: "company_profile_id",
});

InvoiceTemplate.belongsTo(MyClient, {
    foreignKey: "client_id"
});
