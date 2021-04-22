import {Router} from "express";
import {ClientListController} from "../../controllers/client-list-controller";

export class ProtectedClientRouter {

    public router: Router = Router();

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.get('/', ClientListController.index);
        this.router.post('/create', ClientListController.create);
    }
}
