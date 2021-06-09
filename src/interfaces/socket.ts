/**
 * This file contains the code required
 * to define interfaces for Socket related operations.
 */
import { Socket } from 'socket.io';

export interface ISocket extends Socket {
    userInfo?: any;
}

export interface INotificationPayload {
    identifier: string;
    msgBody: any;
    msg?: any;
}