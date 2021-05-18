import {InvoiceTemplate} from "../../models/invoice_template";
import {MyLogo} from "../../models/my_logo";
import {CompanyProfile} from "../../models/company_profile";
import {MyClient} from "../../models/client";

export class InvoiceTemplateDao {

    static async save(input: any) {
       return InvoiceTemplate.create(input);
    }


    static async findAllWithPagination(userId: number, offset, limit) {
        return InvoiceTemplate.findAll({
            where: {
                user_id: userId
            },
            offset: offset,
            limit: limit,
            order: [
                ['date_created', 'DESC'],
            ],
            include: [
                {
                    model: CompanyProfile,

                },
                {
                    model: MyClient
                }
            ]
        });
    }


    static async countAll(userId: number) {
        return MyLogo.count({
            where: {
                user_id: userId
            }
        });
    }
}
