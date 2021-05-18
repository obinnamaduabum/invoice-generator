import {CustomRouterInterface} from "../interface/CustomRouterInterface";
import IndexRouter from "./index-router";
import PublicAuthenticationRouter from "./unprotected/public_authentication_router";
import ProtectedAuthenticationRouter from "./protected/protected_authentication_router";
import {ProtectedMyLogoRouter} from "./protected/protected_logo_router";
import {ProtectedFileUploadRouter} from "./protected/protected_file_upload_router";
import ProtectedCompanyProfileRouter from "./protected/protected_company_profile_router";
import {ProtectedClientRouter} from "./protected/protected_client_router";
import {ProtectedInvoiceTemplateRouter} from "./protected/protected_invoice_template_router";
import {ProtectedDownloadPDFRouter} from "./protected/protected_download_pdf_router";

const mainPath = "/api";
const v1 = "/v1";
const publicPath = "/public";
const protectedPath = "/protected"
export const customRouters: CustomRouterInterface[] = [
    {
        url: `${mainPath}${v1}${publicPath}/`,
        routerObj: new IndexRouter()
    },
    {
        url: `${mainPath}${v1}${publicPath}/auth`,
        routerObj: new PublicAuthenticationRouter()
    },
    {
        url: `${mainPath}${v1}${protectedPath}/auth`,
        routerObj: new ProtectedAuthenticationRouter()
    },
    {
        url: `${mainPath}${v1}${protectedPath}/logos`,
        routerObj: new ProtectedMyLogoRouter()
    },
    {
        url: `${mainPath}${v1}${protectedPath}/file-upload`,
        routerObj: new ProtectedFileUploadRouter()
    },
    {   url: `${mainPath}${v1}${protectedPath}/company-profile`,
        routerObj: new ProtectedCompanyProfileRouter()
    },
    {
        url: `${mainPath}${v1}${protectedPath}/client`,
        routerObj: new ProtectedClientRouter()
    },
    {
        url: `${mainPath}${v1}${protectedPath}/invoice-template`,
        routerObj: new ProtectedInvoiceTemplateRouter()
    },
    {
        url: `${mainPath}${v1}${protectedPath}/pdf-download`,
        routerObj: new ProtectedDownloadPDFRouter()
    }
];
