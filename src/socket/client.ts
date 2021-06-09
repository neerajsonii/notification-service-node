import socketio from 'socket.io';
import { ISocket } from '../interfaces/socket';
import { AccessMapping } from './access.mapping';
import SocketAuth from './auth';

export class SocketClient {
    constructor(private socket: ISocket, private io?: socketio.Server) {
        this.getSocketRoleAndAssignRooms();
    }

    public broadcast(event: string, data?: any) {
        this.socket.broadcast.emit(event, data);
    }

    public joinRoom(name: string) {
        this.socket.join(name);
    }

    private async getSocketRoleAndAssignRooms() {
        const role = await new SocketAuth(this.socket).getRole().catch(e => {
            console.log(e);
            return;
        });
        if (role) {
            const rooms = AccessMapping.getRoomsForRole(role);
            rooms.forEach(room => {
                console.log(`${this.socket.id} joined room ${room}`);
                this.joinRoom(room);
            });
        }
    }
}
