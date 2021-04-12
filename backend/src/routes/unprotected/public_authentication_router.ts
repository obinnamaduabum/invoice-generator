import {Router} from "express";
import { AuthenticationController } from "../../controllers/authentication-controller";

class PublicAuthenticationRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes()
    }

    public initializeRoutes() {
        // @ts-ignore
        this.router.post('/login', AuthenticationController.validate('validateUserCredentials'),
            AuthenticationController.authenticateUser);
    }
}

export default PublicAuthenticationRouter;
