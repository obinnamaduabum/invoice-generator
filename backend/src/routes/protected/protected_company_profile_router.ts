import {Router} from "express";
import {CompanyProfileController} from "../../controllers/company_profile_controller";

class ProtectedCompanyProfileRouter {

    public router: Router = Router();

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.get('/', CompanyProfileController.index);
        this.router.post('/create', CompanyProfileController.create);
    }
}

export default ProtectedCompanyProfileRouter;
