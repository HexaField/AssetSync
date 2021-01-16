import { isNode } from '@AssetSync/common'
import * as THREE from 'three'
import { AmmoPhysics } from '@enable3d/ammo-physics'
import { PHYSICS_SHAPES, PHYSICS_TYPES } from '../Constants.js'
export default class RealmWorld {
    constructor(database) {
        this.database = database
        this.assetSync = database.assetSync
        this.objects = {}

        this.scene = new THREE.Scene()
        this.physics = new AmmoPhysics(this.scene)
        this.physicsTypes = Object.values(PHYSICS_TYPES);
    }

    getPhysicsType(type) {
        for (let i in this.physicsTypes)
            if (this.physicsTypes[i] === type)
                return i - 1;
        return -1;
    }

    getPhysicsShape(type) {
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

    async initialise(onProgress) {

        for (let obj of await this.database.getObjects()) {
            await this.loadObject(obj);
        }

        this.database.realmHandler.on('update', delta => this.update(delta))
    }

    update(delta) {
        this.physics.update(delta * 1000)
    }

    async createObject(object) {
        
    }
    /**
     * 
     * @param {string} uuid 
     * @returns {THREE.Object3D}
     */
    getObject(uuid) {
        return this.objects[uuid]
    }

    async loadObject(object) {
        if(!object) return
        this.objects[object.uuid] = object
        this.scene.add(object)
        this.restorePhysics(object)
    }

    restorePhysics(object) {
        // if (object.userData.originatorID !== this.conjure.assetSync.peerID) return
        if (!object.userData.physics || object.body) return

        if (this.getPhysicsType(object.userData.physics.type) < 0) return

        this.physics.add.existing(object, {
            shape: this.getPhysicsShape(object.userData.physics.shape),
            collisionFlags: this.getPhysicsType(object.userData.physics.type),
            mass: object.userData.physics.mass,
            // breakable: object.userData.physics.destructable
        });
        object.body.setGravity(0, -object.userData.physics.gravity, 0)
        object.body.setBounciness(object.userData.physics.bounciness)
    }
    // TODO: fix this - hashs arent handled properly
    async updateObjectPosition(object) {
    }

    async updateObject(object) {
    }

    async removeObject(object) {
        if(!object || !this.objects[object.uuid]) return

        object.body && this.physics.destroy(object.body)
        this.scene.remove(object)
        
        // if (object.material)
        //     object.material.dispose()
        // if (object.geometry)
        //     object.geometry.dispose()
        // this.conjure.renderer.renderLists.dispose()

        delete this.objects[object.uuid]
    }

    teleport(object, x, y, z) {
        object.body.setCollisionFlags(2);
        object.position.set(x, y, z);
        object.body.needUpdate = true;
        object.body.once.update(() => {
            object.body.setCollisionFlags(object.userData.physics.type)
            object.body.setVelocity(0, 0, 0)
            object.body.setAngularVelocity(0, 0, 0)
        })
    }
}