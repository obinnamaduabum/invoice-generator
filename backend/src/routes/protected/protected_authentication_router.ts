
import {Router} from 'express';
import {AuthenticationController} from "../../controllers/authentication-controller";

class ProtectedAuthenticationRouter {

    public router: Router = Router();

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.get('/me', AuthenticationController.me);
        this.router.get('/logout', AuthenticationController.logOut);
        this.router.post('/logout', AuthenticationController.logOut);
    }
}

export default ProtectedAuthenticationRouter;
