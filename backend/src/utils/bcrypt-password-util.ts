import bCrypt from "bcrypt";

export class BcryptPasswordUtil {

    static async compare(inputPassword: string, password: string) {

        return new Promise((resolve, reject) => {
            bCrypt.compare(inputPassword, password).then(async (value) => {
                resolve(value);
            }).catch(error => {
                reject(error);
            })
        });
    }

    static async encrypt(password: string) {
        const saltRounds: number = 15;
        return new Promise((resolve, reject) => {
            bCrypt.genSalt(saltRounds, function (err, salt) {
                bCrypt.hash(password, salt, function (err, hash) {
                    if(!err) {
                        resolve(hash);
                    } else {
                      reject(err);
                    }
                });
            });
        });
    }
}
