import {Request, Response} from "express";

export class UserController {

    static async create(req: Request, res: Response) {
        return res.status(200).send({
            success: true,
            message: 'I am here, hello!',
        });
    }
}
