import {QueryTypes} from "sequelize";
import {PostgresDatabase} from "../database/postgres_db";
import {MySequenceTypeConstant} from "../lh_enum/sequence_type";

export class MySequences {

    static async getSequenceId(mySequenceTypeConstant: MySequenceTypeConstant) {
        return MySequences.createOrGenerate(mySequenceTypeConstant.toLowerCase());
    }

    static async createOrGenerate(sequenceTableName: string) {

        try {
            const query = "CREATE sequence IF NOT EXISTS " + sequenceTableName + " start with 0 minvalue 0 increment BY 1;";
            const data: any = await new PostgresDatabase().getSequelize.query(query);
            if (data) {
                const value: any[] = await new PostgresDatabase().getSequelize.query("SELECT nextval('" + sequenceTableName + "')", {
                    type: QueryTypes.SELECT
                });
                if(value){
                    if(value.length > 0){
                        return value[0]['nextval'];
                    }
                    return null;
                }
                return null;
            }
            return null;
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}
