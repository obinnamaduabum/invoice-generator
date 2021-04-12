import {User} from "../../../models/User";

export class UserDao {

    static async findByEmail(email: string) {
        try {
            console.log(email);
            return User.findOne({
                where: {
                    email: email.trim().toLowerCase()
                }
            });
        } catch (e) {
            console.log(e);
            throw e;
        }
    }


    static async unBlockUser(email: string): Promise<void> {
        const emailTrimmed = email.trim().toLowerCase();

       const query = {
            blocked: false,
            failedLoginAttemptCount: 0
        };
        await User.update(query, {where: {email: emailTrimmed}});
    }

    static async checkIfEmailExists(email: string) {
        return User.findOne({
            where: {
                email: email.toString().toLowerCase()
            }
        });
    }

}
