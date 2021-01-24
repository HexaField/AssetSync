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
        UPDATE: 21,
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

export const PHYSICS_TYPES = {
    NONE: 'None',
    DYNAMIC: 'Dynamic',
    STATIC: 'Static',
    KINEMATIC: 'Kinematic',
    GHOST: 'Ghost',
}

export const PHYSICS_SHAPES = {
    AUTO: 'Automatic',
    CONVEX: 'Convex Mesh',
    CONCAVE: 'Concave Mesh',
    EXTRUDE: 'Extrude Mesh',
    BOX: 'Box',
    CONE: 'Cone',
    CYLINDER: 'Cylinder',
    PLANE: 'Plane',
    SPHERE: 'Sphere',
    TORUS: 'Torus',
}
