import {Router} from "express";
import {MyLogoController} from "../../controllers/my_logo_controller";
import {FileUploadController} from "../../controllers/file-upload-controller";

export class ProtectedFileUploadRouter {

    public router: Router = Router();

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.post('/upload', FileUploadController.fileUpload);
    }
}
