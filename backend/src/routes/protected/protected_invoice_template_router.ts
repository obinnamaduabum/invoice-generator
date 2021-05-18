import {Router} from "express";
import {InvoiceTemplateController} from "../../controllers/invoice_template_controller";

export class ProtectedInvoiceTemplateRouter {

    public router: Router = Router();

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.get('/', InvoiceTemplateController.index);
        this.router.post('/create', InvoiceTemplateController.create);
    }
}
