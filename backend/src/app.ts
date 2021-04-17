import express, {Application} from 'express';
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser'; // module for parsing cookies
import cors from "cors";
import {MyUtils} from "./utils/my_util";
import {CustomRouterInterface} from "./interface/CustomRouterInterface";
import {logger} from "sequelize/types/lib/utils/logger";

export class App {

    public app: Application;
    public port: number;
    public hostName: string;

    options: cors.CorsOptions = {
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
        credentials: true,
        methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
        origin: "*",
        preflightContinue: false
    };
    public allowedOrigins: string[] = [
        'localhost:8000',
        'localhost:3000',
        'localhost:3100',
        'localhost:4200',
    ];

    constructor(controllers: CustomRouterInterface[], port: number, hostName: string) {

            this.app = express();
            this.port = port;
            this.hostName = hostName;
            if (process.env.NODE_ENV === 'development') {
                // this.app.use(logger('dev')); // log requests to the console
            }
            this.initializeMiddleWares();
            this.initializeControllers(controllers);
    }

    private initializeMiddleWares() {

        try {

            this.app.use(bodyParser.json({limit: '1000mb'}));
            this.app.use(cookieParser());
            const allowedOrigins = this.allowedOrigins;
            const myCors = cors({

                origin: function (origin, callback) {
                    // allow requests with no origin
                    // (like mobile apps or curl requests)
                    if (!origin) {
                        return callback(null, true);
                    }
                    if (MyUtils.indexOfArray(allowedOrigins, origin) === -1) {
                        let msg = 'The CORS policy for this site does not ' +
                            'allow access from the specified Origin.';
                        return callback(new Error(msg), false);
                    }

                    return callback(null, true);
                },
                exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
                credentials: true,
            });
            this.app.use(myCors);
        } catch (e) {
            console.log(e);
        }
    }

    private initializeControllers(controllers: CustomRouterInterface[]) {
        controllers.forEach((controller) => {
            if (controller) {
                this.app.use(controller.url, controller.routerObj.router);
            }
        });
    }

    public listen() {
        try {
            this.app.listen(this.port, this.hostName, () => {
                console.log(process.env.NODE_ENV);
                console.log(`API gateway server running express started on hostname: ${this.hostName} port: ${this.port}.`);
            });
        } catch (e) {
            console.log(e);
        }
    }
}
