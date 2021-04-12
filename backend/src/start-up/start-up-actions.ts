import {AddUser} from "./json/add-admin";

export class StartUpActions {

    static async init() {
        await AddUser.add();
    }
}
