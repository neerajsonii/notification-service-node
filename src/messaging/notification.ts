import { INotificationPayload } from '../interfaces/socket';
import { SocketServer } from '../socket';
import { EVENTS } from '../socket/socket.constants';

export class NotificationMessaging {
    public async process(payload: INotificationPayload) {
        switch (payload.identifier) {
            case EVENTS.PRODUCT.ADDED: {
                SocketServer.emitByEvent(payload.identifier, payload.msgBody);
                break;
            }
            case EVENTS.EMIT_ALL: {
                SocketServer.emitToAll(payload.identifier, payload.msgBody);
                break;
            }
            default:
                console.log('Event Not handled (Unknown Event) - ' + payload.identifier);
        }
        return true;
    }
}
