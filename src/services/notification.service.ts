import { Response } from 'express-serve-static-core';
import { INotificationPayload } from '../interfaces/socket';
import { NotificationMessaging } from '../messaging/notification';


class NotificationService {
    private readonly messaging: NotificationMessaging;
    constructor() {
        this.messaging = new NotificationMessaging()
    }

    public async publishNotification(payload: INotificationPayload, res: Response) {
        try {
            await this.messaging.process(payload);
            console.log('notification sent for Event - ' + payload.identifier);
            return res.status(200).send({ data: 'notification sent' });
        } catch (err) {
            return res.status(500).send({ error: 'notification failed' });
        }
    }
}

export default new NotificationService()
