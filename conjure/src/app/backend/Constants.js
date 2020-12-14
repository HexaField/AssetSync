export const NETWORKING_OPCODES = {
    HEARTBEAT: 0,
    USER: {
        METADATA: 10,
        MOVE: 11,
        ANIMATION: 12,
        LEAVE: 13,
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