import {Router} from "express";
import {PdfController} from "../../controllers/pdf_controller";

export class ProtectedDownloadPDFRouter {

    public router: Router = Router();

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.post('/create', PdfController.exportPDF);
    }
}
