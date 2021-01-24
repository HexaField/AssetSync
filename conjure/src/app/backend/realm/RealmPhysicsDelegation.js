import { PHYSICS_SHAPES, PHYSICS_TYPES } from '../Constants.js'

export class RealmPhysicsDelegation {
    constructor(realmWorld) {
        this.physicsTypes = Object.values(PHYSICS_TYPES)
        this.realmWorld = realmWorld
        this.primaries = {}
        // this.secondaries = {} // add one once primary/secondary is working
        this.replicas = {}
        this.isDelegatingPhysics = false
    }

    async initialise(forceSync) {
        this.isDelegatingPhysics = forceSync
    }

    // start accepting and delegating physics
    setMaster() {
        this.isDelegatingPhysics = true
    }

    // stop accepting and delegating physics
    setSlave() {
        this.isDelegatingPhysics = false
    }

    // === PHYSICS === //

    addPhysics(object) {
        if (!object.userData.physics || object.body) return
        if (this._getPhysicsType(object.userData.physics.type) < 0) return

        const collisionType = this._getCollisionType(object)
        this.realmWorld.physics.add.existing(object, {
            shape: this._getPhysicsShape(object.userData.physics.shape),
            collisionFlags: collisionType,
            mass: object.userData.physics.mass,
            // breakable: object.userData.physics.destructable
        });
        object.body.setGravity(0, -object.userData.physics.gravity, 0)
        object.body.setBounciness(object.userData.physics.bounciness)
    }

    removePhysics(object) {
        object.body && this.realmWorld.physics.destroy(object.body)
    }

    teleport(object, x, y, z) {
        if(object.body) {
            object.body.setCollisionFlags(2);
        }
        object.position.set(x, y, z);
        if(object.body) {
            object.body.needUpdate = true;
            object.body.once.update(() => {
                object.body.setCollisionFlags(object.userData.physics.type)
                object.body.setVelocity(0, 0, 0)
                object.body.setAngularVelocity(0, 0, 0)
            })
        }
    }

    _getCollisionType(object) {
        const type = this._getPhysicsType(object.userData.physics.type)
        if(this.isDelegatingPhysics && Object.keys(this.primaries).includes(object.uuid)) {
            return type
        }
        return 2 // kinematic
    }

    _getPhysicsType(type) {
        for (let i in this.physicsTypes)
            if (this.physicsTypes[i] === type)
                return i - 1;
        return -1;
    }

    _getPhysicsShape(type) {
        switch (type) {
            case PHYSICS_SHAPES.AUTO: return 'unknown';
            case PHYSICS_SHAPES.CONVEX: return 'convexMesh';
            case PHYSICS_SHAPES.CONCAVE: return 'concaveMesh';
            case PHYSICS_SHAPES.EXTRUDE: return 'hacd';
            case PHYSICS_SHAPES.BOX: return 'box';
            case PHYSICS_SHAPES.CONE: return 'cone';
            case PHYSICS_SHAPES.CYLINDER: return 'cylinder';
            case PHYSICS_SHAPES.PLANE: return 'plane';
            case PHYSICS_SHAPES.SPHERE: return 'sphere';
            case PHYSICS_SHAPES.TORUS: return 'torus';
            default: return 'unknown';
        }
    }

}