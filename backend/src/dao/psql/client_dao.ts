import {MyClient} from "../../models/client";
import Sequelize from "sequelize";

export class ClientDao {

    static async countAll(userId: number) {
        try {
            return await MyClient.count({
                where: {
                    user_id: userId
                }
            });
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    static async findAllWithPagination(userId: number, offset: number, limit: number) {

        try {
            return await MyClient.findAll({
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

    static async findByEmailAndUserId(email: string, userId: number) {
        return await MyClient.findOne({
            where: {
                email: Sequelize.where(
                    Sequelize.fn('lower', Sequelize.col('email')),
                    Sequelize.fn('lower', email)
                ),
                user_id: userId
            },
        });
    }
}
