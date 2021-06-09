import { get as _get } from 'lodash';
import { ROLES_MAPPING } from './socket.constants';

export class AccessMapping {
    public static async loadMappings() {
        try {
            this.roleRoomMappings = await this.fetchRolesRoomMapping();
            return this.roleRoomMappings;
        } catch (err) {
            throw { error: 'Error while loading access mapping' };
        }
    }

    public static getRoomsForRole(role: string): string[] {
        return _get(this.roleRoomMappings, [role], []);
    }

    public static getAllRoles() {
        return Object.keys(this.roleRoomMappings);
    }

    private static roleRoomMappings: any = {};

    private static async fetchRolesRoomMapping() {
        return ROLES_MAPPING;
    }
}
