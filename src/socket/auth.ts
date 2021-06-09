/**
 * This file contains the code required to
 * authenticate socket connection requests.
 */
import { get as _get } from 'lodash';
import { ISocket } from '../interfaces/socket';
import { ERRORS } from './socket.constants';

export default class SocketAuth {
    constructor(private socket: ISocket) {}

    public async authenticate(): Promise<boolean> {
        const role = _get(this.socket, 'handshake.query.role', false);
        const token = _get(this.socket, 'handshake.query.token', false);
        
        if (token !== 'AUTH_TOKEN') { // use your auth logic here
            return false;
        }
        
        /**
         * Add Socket Identity Information
         */

        // use your auth method here and assign your role as per your requirement
        this.socket.userInfo = role;
        return true;
    }

    public getRole(): Promise<string> {
        return new Promise((resolve, reject) => {
            const UserRoleId = this.socket.userInfo || null;
            if (!UserRoleId) {
                reject(ERRORS.NOT_A_VALID_USER_ROLE);
                return;
            }
            resolve(UserRoleId);
        });
    }
}
