import { isNode } from '@AssetSync/common'
import * as THREE from 'three'
import { AmmoPhysics } from '@enable3d/ammo-physics'
import { RealmPhysicsDelegation } from './RealmPhysicsDelegation.js'

export default class RealmWorld {
    constructor(database) {
        this.database = database
        this.assetSync = database.assetSync
        this.objects = {}

        // this.delegator = new RealmPhysicsDelegation(this)

        this.scene = new THREE.Scene()
        this.physics = new AmmoPhysics(this.scene)
        this.vec3 = new THREE.Vector3()
    }
    async initialise(onProgress, forceSync) {

        // await this.delegator.initialise(forceSync)

        for (let obj of await this.database.getObjects()) {
            this.loadObject(obj);
        }

        onProgress(Object.keys(this.objects).length, 'objs')


        this.database.realmHandler.on('update', delta => this.update(delta))
    }

    update(delta) {
        this.physics.update(delta)
        this.physics.updateDebugger()
        /*
        Object.values(this.objects).forEach((object) => {
            if (object.body) {
                let pos = object.getWorldPosition(this.vec3);
                if (pos.y < -10 || pos.y > 100 || pos.x > 100 || pos.x < -100 || pos.z > 100 || pos.z < -100) {
                    this.delegator.teleport(object, 0, 10, 0);
                }
            }
        })
        */
    }

    /**
     * 
     * @param {string} uuid 
     * @returns {THREE.Object3D}
     */
    getObject(uuid) {
        return this.objects[uuid]
    }

    /**
     * @returns {[THREE.Object3D]}
     */
    getAllObjects() {
        return Object.values(this.objects)
    }

    loadObject(object) {
        if (!object) return
        this.objects[object.uuid] = object
        this.scene.add(object)
        // this.delegator.addPhysics(object)
    }

    updateObject(uuid, param, value) {
        // console.log('updateObject', uuid, param, value)
        const object = this.getObject(uuid)
        if(!object) {
            console.warn('trying to update unknown object', uuid)
            return
        }
        object.userData.needsSaving = true
        this.database.objectsToSave.push(object.uuid)
        if (object && object[param]) {
            if (param === 'position')
                object.position.set(value.x, value.y, value.z)
            if (param === 'rotation')
                object.rotation.setFromVector3(new THREE.Vector3(value._x, value._y, value._z), value._order)
            if (param === 'scale')
                object.scale.set(value.x, value.y, value.z)
            // this._iterateUpdateValues(object, param, value)
        }
    }

    // todo: fix this. make a test maybe?
    _iterateUpdateValues(object, param, value) {
        if (typeof value === 'object') {
            for (let key of Object.keys(value)) {
                if (value[key]) {
                    this._iterateUpdateValues(object[param], key, value[key])
                } else {
                    object[param][key] = {}
                    this._iterateUpdateValues(object[param], key, value[key])
                }
            }
        } else {
            object[param] = value
        }
    }

    removeObject(object) {
        const uuid = typeof object === 'object' ? object.uuid : object
        if (!object || !this.objects[uuid]) return

        // this.delegator.removePhysics(this.objects[uuid])
        this.scene.remove(this.objects[uuid])

        // if (object.material)
        //     object.material.dispose()
        // if (object.geometry)
        //     object.geometry.dispose()
        // this.conjure.renderer.renderLists.dispose()

        delete this.objects[uuid]
    }
}