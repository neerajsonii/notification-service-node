import { NotificationPayload } from '../interfaces/socket';
import { SocketServer } from '../socket';
import { EVENTS } from '../socket/socket.constants';

export class NotificationMessaging {
    public async process(payload: NotificationPayload) {
        switch (payload.identifier) {
            case EVENTS.PRODUCT.ADDED: {
                SocketServer.emitByEvent(payload.identifier, payload.msgBody);
                break;
            }
            default:
                console.log('Event Not handled (Unknown Event) - ' + payload.identifier);
        }
        return true;
    }
}
