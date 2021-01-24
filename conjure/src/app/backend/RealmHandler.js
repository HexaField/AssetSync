import RealmDatabase from "./realm/RealmDatabase.js"
import RealmData, { GLOBAL_REALMS, REALM_TYPES } from './realm/RealmData.js'
import { getParams, isNode } from "@AssetSync/common"
import EventEmitter from 'events'
import * as THREE from 'three'
import { initialisePhysics } from './functions/initialisePhysics.js'

export default class RealmHandler extends EventEmitter {
    constructor({ assetSync, verboseOutput, forceNetwork }) {
        super()
        this.assetSync = assetSync
        this.verboseOutput = verboseOutput
        this.forceNetwork = forceNetwork

        this.dhtProtocol = '/realm/' // id is added between these
        // this.dhtVersion = '/1.0.0' // not currently impelemented
        this.realms = {}
        this.objectLoader = new THREE.ObjectLoader();

    }

    async initialise() {
        if(isNode) {
            const { nodePolyfillThree } = await import('./functions/nodePolyfillThree.js')
            nodePolyfillThree()
        }
        await initialisePhysics()
        const clock = new THREE.Clock()
        const animate = () => {
            const delta = clock.getDelta() * 1000
            this.update(parseInt(delta.toString()))
            window.requestAnimationFrame(animate)
        }
        window.requestAnimationFrame(animate)
        // if(isNode) {
        //     await this.preloadGlobalRealms()
        //     for (let realm of await this.getPinnedRealms()) {
        //         await this.addDatabase(realm, this.assetSync.log, this.forceNetwork)
        //     }
        // }
    }

    cleanup() {
        if(isNode) {
            window.close()
        }
    }

    update(delta) {
        this.emit('update', delta)
        
    }

    // DHT data
    // key: realmId
    // value: realmData

    _doValidation(realmData) {

        if (realmData === undefined) return false
        if (realmData.id === undefined) return false
        if (realmData.name === undefined) return false

        return true
    }

    validateRealm(realmData) {
        let dataToValidate = realmData
        if (typeof realmData === 'string') {
            try {
                dataToValidate = JSON.parse(realmData)
            } catch (err) {
                return
            }
        }
        const success = this._doValidation(dataToValidate)
        if (success) {
            return realmData
        }
        return
    }

    async get(key, saveLocal) {
        try {
            const value = await this.assetSync.dhtPlugin.get({ key: this.dhtProtocol + key })
            if (!this.validateRealm(value))
                return
            if (value) {
                if (saveLocal) {
                    await this.assetSync.dhtPlugin.putLocal({ key: this.dhtProtocol + key, value })
                }
                return JSON.parse(value)
            }
        } catch (err) {
            console.log(err)
        }
        return
    }

    async put(key, value) {
        try {
            return await this.assetSync.dhtPlugin.put({ key: this.dhtProtocol + key, value, minPeers: '1' })
        } catch (err) { console.log(err) }
    }

    receiveFromDHT(key, value, from) {
        if(isNode) {
            try {
                if (this.validateRealm(value)) {
                    this.assetSync.dhtPlugin.putLocal({ key: this.dhtProtocol + key, value })
                    this.addDatabase(typeof value === 'string' ? JSON.parse(value) : value, this.assetSync.log, this.forceNetwork)
                } else {
                    this.removeDatabase(typeof value === 'string' ? JSON.parse(value) : value)
                }
            } catch (err) {
                console.log(err, JSON.stringify(value, null, 2))
            }
        }
    }

    async preloadGlobalRealms() {
        for (let realm of Object.values(GLOBAL_REALMS)) {
            realm.global = true
            await this.addDatabase(realm, this.assetSync.log, this.forceNetwork)
        }
    }

    // API

    async updateRealm(realmData) {
        await this.createRealm(realmData)
    }

    async forgetRealm(realmData) {
        await this.assetSync.dhtPlugin.removeLocal({ key: this.dhtProtocol + realmData.id })
        await this.removeDatabase(realmData)
    }

    async getPinnedRealms() {
        return (await this.assetSync.dhtPlugin.getAllLocal())
            .filter((realm) => { return realm.key.substring(0, 7) === '/realm/' && realm.value !== undefined && realm.value !== '' })
            .map((realm) => { return JSON.parse(realm.value) })
    }

    async getRealmById(id, saveLocal) {
        return await this.get(id, saveLocal)
    }

    async createRealm(realmData) {
        if (realmData.type === REALM_TYPES.NONE) {
            await this.put(realmData.id, JSON.stringify(realmData))
            await this.addDatabase(realmData)
        }
    }

    /**
     * 
     * @param {RealmData} realmData 
     * @returns {RealmDatabase}
     */
    getDatabase(realmData) {
        return this.realms[realmData.id || realmData]
    }

    async addDatabase(realmData, onProgress, forceSync = false) {
        return this.realms[realmData.id] || await this._createDatabase(realmData, this.verboseOutput ? ((...messages) => { console.log('Loading Realm ' + realmData.id + ':', ...messages) }) : onProgress, forceSync)
    }

    async _createDatabase(realmData, onProgress, forceSync) {
        const database = new RealmDatabase(this, new RealmData(realmData), this.dhtProtocol)
        await database.start(onProgress, forceSync)
        this.realms[realmData.id] = database
        return database
    }

    async removeDatabase(realmData) {
        const id = typeof realmData === 'object' ? realmData.id : realmData
        if (this.realms[id]) {
            await this.assetSync.dhtPlugin.removeDHT(this.dhtProtocol + id)// + this.dhtVersion)
            await this.realms[id].stop()
            delete this.realms[id]
        }
    }
}