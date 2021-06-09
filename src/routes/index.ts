/**
 * This file contains the code required
 * to initialize and map routes.
 */
import * as express from 'express';

import { RouterMiddlewares } from './middlewares';
import { NotificationRoutes } from './notification-routes';

export default class Routes {
    public static init(app: express.Application, router: express.Router) {
        /**
         * Invoke Middlewares
         */
        RouterMiddlewares.init(router);

        /**
         * Initialize App Routes
         */
        new NotificationRoutes().init(router);

        app.use('/', router);
    }
}
