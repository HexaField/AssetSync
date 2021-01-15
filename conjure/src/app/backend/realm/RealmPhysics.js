import { isNode } from '@AssetSync/common'
import * as THREE from 'three'

export default class RealmPhysics {
    constructor(database) {
        this.database = database
        this.assetSync = database.assetSync
        this.clock = database.realmHandler.serverClock
        this.scene = new THREE.Scene()
    }

    async initialise(onProgress) {

        // const { AmmoPhysics } = await import('@enable3d/ammo-physics')
        // this.physics = new AmmoPhysics(this.scene)
        
        // for (let { data } of await this.database.getObjects()) {
        //     await this.loadObject(data);
        // }

        // this.database.realmHandler.on('clock', delta => this.update(delta))
    }

    update(delta) {
        this.physics.update(delta * 1000)
    }

    async createObject(object) {
        
    }

    async loadObject(data) {
        
    }

    restorePhysics(object) {
        
    }

    // TODO: fix this - hashs arent handled properly
    async updateObjectPosition(object) {
    }

    async updateObject(object) {
    }

    async removeObject(object) {
    }
}