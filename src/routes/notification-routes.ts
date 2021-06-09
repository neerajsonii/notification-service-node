import * as express from 'express';
import NotificationController from '../controllers/notification.controller';

export class NotificationRoutes {
    public init(router: express.Router) {
        router.post('/api/publish', NotificationController.publish);
    }
}
