export const NETWORKING_OPCODES = {
    HEARTBEAT: 0,
    USER: {
        METADATA: 10,
        REQUEST_METADATA: 11,
        MOVE: 12,
        ANIMATION: 13,
        LEAVE: 14,
    },
    OBJECT: {
        CREATE: 20,
        UPDATE_PROPERTIES: 21,
        DESTROY: 22,
        GROUP: 23,
        MOVE: 24,
        RECEIVE: 25, // for receiving entries from database - distinct from create
        MANIPULATE: {
            START: 26,
            UPDATE: 27,
            END: 28
        }
    }
}