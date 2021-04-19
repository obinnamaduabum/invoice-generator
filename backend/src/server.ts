import dotEnvFlow from "dotenv-flow";
dotEnvFlow.config();
import {CustomRouterInterface} from "./interface/CustomRouterInterface";
import IndexRouter from "./routes/index-router";
import {App} from "./app";
import {PostgresDatabase} from "./database/postgres_db";
import {StartUpActions} from "./start-up/start-up-actions";
import {User} from "./models/user";
import PublicAuthenticationRouter from "./routes/unprotected/public_authentication_router";
import ProtectedAuthenticationRouter from "./routes/protected/protected_authentication_router";
import {MyLogo} from "./models/my_logo";
import {ProtectedMyLogoRouter} from "./routes/protected/protected_logo_router";
import {ProtectedFileUploadRouter} from "./routes/protected/protected_file_upload_router";
import ProtectedCompanyProfileRouter from "./routes/protected/protected_company_profile_router";
import {CompanyProfile} from "./models/company_profile";
import {PhoneNumber} from "./models/phone_number";

const mainPath = "/api";
const v1 = "/v1";
const publicPath = "/public";
const protectedPath = "/protected"
let CustomRouters: CustomRouterInterface[] = [
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
    }
];

let PORT;
let HOSTNAME;

const ip = require('ip');
const myIP = ip.address();

HOSTNAME = `${myIP}`;
if (process.env.NODE_ENV === 'development') {
    if (process.env.HOSTNAME) {
        HOSTNAME = process.env.HOSTNAME;
    }
}


if (process.env.PORT) {
    PORT = parseInt(process.env.PORT);
} else {
    PORT = 3000;
}


try {
    const pd = new PostgresDatabase();
    pd.checkConnection().then(async r => {

        const sequelizeObj = {alter: true, force: false};
        await pd.getSequelize.sync(sequelizeObj);
        await User.sync(sequelizeObj);
        await MyLogo.sync(sequelizeObj);
        await CompanyProfile.sync(sequelizeObj);
        await PhoneNumber.sync(sequelizeObj);
        // await pd.sync();
        await StartUpActions.init();
        const app = new App(CustomRouters, PORT, HOSTNAME);
        app.listen();

    }).catch((e) => {
        console.log(e);
    });
} catch (e) {
    console.error(e);
}


