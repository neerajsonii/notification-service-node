import { Request, Response } from 'express-serve-static-core';
import { INotificationPayload } from '../interfaces/socket';
import NotificationService from '../services/notification.service';

class NotificationController {
    constructor() {}

    public async publish(req: Request, res: Response) {
        const payload: INotificationPayload = req.body.data;
        return NotificationService.publishNotification(payload, res);
    }
}

export default new NotificationController();

