import {MyLogo} from "../../models/my_logo";

export class LogoDao {

    static async index(offset: number, limit: number, userId: number) {
        try {
            return MyLogo.findOne({
                where: {
                    user_id: userId
                },
                offset: offset, limit: limit,
                order: [
                    ['date_created', 'DESC'],
                ],
            });
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}
