/**
 * This file contains all the code required
 * to setup and initialize various middlewares.
 */
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { Router } from 'express-serve-static-core';
import helmet from 'helmet';

export class RouterMiddlewares {
    public static init(router: Router) {
        router.use(bodyParser.urlencoded({ extended: false, limit: 10000000 }));
        router.use(bodyParser.json({ limit: '1000mb' }));
        router.use(helmet());
        router.use(cors());
    }
}
