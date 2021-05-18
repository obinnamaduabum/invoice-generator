import {User} from "../models/user";
import {MyLogo} from "../models/my_logo";
import {CompanyProfile} from "../models/company_profile";
import {PhoneNumber} from "../models/phone_number";
import {MyClient} from "../models/client";
import {InvoiceTemplate} from "../models/invoice_template";

export class TableSetup {

    static async createTable() {
        const sequelizeObj = {alter: true, force: false};
        // await pd.getSequelize.sync(sequelizeObj);
        await User.sync(sequelizeObj);
        await MyLogo.sync(sequelizeObj);
        await CompanyProfile.sync(sequelizeObj);
        await PhoneNumber.sync(sequelizeObj);
        await MyClient.sync(sequelizeObj);
        await InvoiceTemplate.sync(sequelizeObj);
    }
}
