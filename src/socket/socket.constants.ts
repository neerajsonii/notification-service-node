
// list and add all your system roles here
export enum ROLES {
    USER = 'USER',
};

// list and add all your rooms here where the roles belongs
export enum ROOMS {
    ROOM_A = 'ROOM_A',
    ROOM_B = 'ROOM_B',
};

// list and add all your events here on which notification will be sent out
export const EVENTS = {
    PRODUCT: {
        ADDED: 'PRODUCT_ADDED',
    },
    EMIT_ALL: 'EMIT_TO_ALL'
};

export enum SOCKET_EVENT_TYPES {
    CONNECTION = 'connection',
};

export const ERRORS = {
    NOT_A_VALID_USER_ROLE: 'Provided User Role is not a valid user role.',
};

// ROLES mapping with respected rooms
export const ROLES_MAPPING = {
    [ROLES.USER]: [ROOMS.ROOM_A]
}

// EVENTS mapping with respected rooms
export const EVENTS_MAPPING_TO_ROOMS = {
    [EVENTS.PRODUCT.ADDED]: [ROOMS.ROOM_A]
}

// ROLES mapping with respected roles
export const EVENTS_MAPPING_TO_ROLES = {
    [EVENTS.PRODUCT.ADDED]: [ROLES.USER]
}

