/**
 * This file contains the code required
 * to manage socket operations
 */
import { Server } from 'socket.io';
import { ISocket } from '../interfaces/socket';
import { AccessMapping } from './access.mapping';
import SocketAuth from './auth';
import { SocketClient } from './client';
import { EventMapping } from './event.mapping';
import { ROLES, ROOMS, SOCKET_EVENT_TYPES } from './socket.constants';

export class SocketServer {

    public static init(io: Server) {
        SocketServer.io = io;
        SocketServer.io.use(async (socket: ISocket, next: any) => {
            const isAuthenticated: boolean | void = await new SocketAuth(socket)
                .authenticate()
                .catch(() => {
                    console.log('401 - UNAUTHORIZED');
                    next(new Error('401 - UNAUTHORIZED'));
                });
            if (isAuthenticated) {
                next();
            } else {
                console.log('401 - UNAUTHORIZED');
                next(new Error('401 - UNAUTHORIZED'));
            }
        }).on(SOCKET_EVENT_TYPES.CONNECTION, (socket: ISocket) => {
            const client = new SocketClient(socket);
            console.log('client connected => ', socket.id, client);
            
        });
    }

    /*
     * Method to emit event to all connected clients
     */
    public static emitToAll(event: string, data?: any, cb?: () => void) {
        SocketServer.io.emit(event, data, cb);
    }

    /**
     * Method to emit event in room to all connected clients
     */
    public static emitInRoom(
        room: ROOMS,
        event: string,
        data?: any,
        cb?: () => void
    ) {
        SocketServer.io.to(room).emit(event, data, cb);
    }

    /**
     * Method to emit event to target rooms for specific role
     */
    public static emitForRole(
        role: ROLES,
        event: string,
        data?: any,
        cb?: () => void
    ) {
        const rooms = AccessMapping.getRoomsForRole(role);
        rooms.forEach((room: ROOMS) => {
            this.emitInRoom(room, event, data, cb);
        });
    }

    /**
     * Method to emit event to target roles specified in Event Policy
     */
    public static emitByEvent(event: string, data?: any, cb?: () => void) {
        const roles = EventMapping.getRolesForEvent(event);
        roles.forEach((role: ROLES) => {
            this.emitForRole(role, event, data, cb);
        });
    }
    
    private static io: Server;

}
