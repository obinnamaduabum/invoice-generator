import {Router} from "express";
import {MyLogoController} from "../../controllers/my_logo_controller";

export class ProtectedMyLogoRouter {

    public router: Router = Router();

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.get('/', MyLogoController.index);
    }
}
