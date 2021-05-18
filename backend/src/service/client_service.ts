import {Request, Response} from "express";
import {ClientRequestInterface} from "../interface/client_request_interface";
import {MyClient} from "../models/client";
import {MySequences} from "../utils/sequence_generator";
import {MySequenceTypeConstant} from "../lh_enum/sequence_type";
import {User} from "../models/user";
import {ApiResponseUtil} from "../utils/api-response-util";
import {ClientDao} from "../dao/psql/client_dao";
import {MyUtils} from "../utils/my_util";

export class ClientService {

    static async getRequest(req: Request) {
        const { email, name, address, phoneNumber } = req.body;

        const responseObj: ClientRequestInterface = {
            email: email,
            name: name,
            address: address,
            phoneNumber: phoneNumber
        };

        return responseObj;
    }


    static async save(obj: ClientRequestInterface, userId: number) {
        const date: Date = new Date();
        const code: string = await MySequences.getSequenceId(MySequenceTypeConstant.CLIENT_ID);

        const assignObj = Object.assign(obj, {
            date_created: date,
            date_updated: date,
            code: code,
            user_id: userId});
        return await MyClient.create(assignObj);
    }

    static async findAllWithPaginationAndCount(user: User, page: number, limit: number) {
        const result: any[] = await ClientDao.findAllWithPagination(user.id, page, limit);
        const newArray: any[] = [];
        for(let i = 0; i < result.length; i++) {
            const position = MyUtils.pageOffsetCalculator(page, limit, i);
            newArray.push(Object.assign(result[i]['dataValues'], {position: position}));
        }

        console.log(newArray);
        const count: number = await ClientDao.countAll(user.id);
        return ApiResponseUtil.pagination(page, limit, count, newArray);
    }
}
