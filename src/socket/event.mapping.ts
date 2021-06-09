import { get as _get } from 'lodash';
import { EVENTS_MAPPING_TO_ROLES, EVENTS_MAPPING_TO_ROOMS } from './socket.constants';

export class EventMapping {
    
    public static async loadMappings() {
        try {
            this.eventRoleMappings = await this.fetchEventRoleMappings();
            this.eventRoomMappings = await this.fetchEventRoomMappings();
            return this.eventRoleMappings;
        } catch (err) {
            throw { error: 'Error while loading event mapping' };
        }
    }

    public static getRolesForEvent(event: string): string[] {
        return _get(this.eventRoleMappings, [event], []);
    }
    
    public static getRoomsForEvent(event: string): string[] {
        return _get(this.eventRoomMappings, [event], []);
    }

    private static eventRoleMappings: any = {};
    private static eventRoomMappings: any = {};

    private static async fetchEventRoleMappings() {
        return EVENTS_MAPPING_TO_ROLES;
    }
    
    private static async fetchEventRoomMappings() {
        return EVENTS_MAPPING_TO_ROOMS;
    }
}
