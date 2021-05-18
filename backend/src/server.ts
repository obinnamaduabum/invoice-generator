import dotEnvFlow from "dotenv-flow";
dotEnvFlow.config();
import {App} from "./app";
import {PostgresDatabase} from "./database/postgres_db";
import {StartUpActions} from "./start-up/start-up-actions";
import {customRouters} from "./routes/main_router";
import {TableSetup} from "./database/data_setup";


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

        await TableSetup.createTable();

        await StartUpActions.init();

        const app = new App(customRouters, PORT, HOSTNAME);

        app.listen();

    }).catch((e) => {
        console.log(e);
    });
} catch (e) {
    console.error(e);
}


