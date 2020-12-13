export const NETWORKING_OPCODES = {
    HEARTBEAT: 0,
    USER: {
        METADATA: 10,
        MOVE: 11,
        ANIMATION: 12,
        // UPDATE: 13,
    },
    OBJECT: {
        CREATE: 20,
        UPDATE_PROPERTIES: 21,
        DESTROY: 22,
        GROUP: 23,
        MOVE: 24,
        MANIPULATE: {
            START: 24,
            UPDATE: 25,
            END: 26
        }
    }
}