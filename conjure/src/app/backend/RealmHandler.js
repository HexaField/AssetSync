import RealmDatabase from "./realm/RealmDatabase.js"
import RealmData, { GLOBAL_REALMS, REALM_TYPES } from './realm/RealmData.js'
import { isNode } from "@AssetSync/common"

export default class RealmHandler {
    constructor(assetSync) {
        this.assetSync = assetSync

        this.dhtProtocol = '/realm/' // id is added between these
        // this.dhtVersion = '/1.0.0' // not currently impelemented
        this.realms = {}
    }

    // DHT data
    // key: realmId
    // value: realmData

    async get(key, saveLocal) {
        try {
            const value = await this.assetSync.dhtPlugin.get({ key: this.dhtProtocol + key })
            if(value) {
                if(saveLocal) {
                    await this.assetSync.dhtPlugin.putLocal({ key: this.dhtProtocol + key, value })
                }
                return JSON.parse(value)
            }
        } catch (err) { }
        return undefined 
    }

    async put(key, value) {
        return await this.assetSync.dhtPlugin.put({ key: this.dhtProtocol + key, value, minPeers: '1' })
    }

    receiveFromDHT(key, value, from) {
        try {
            if(value) {
                this.assetSync.dhtPlugin.putLocal({ key: this.dhtProtocol + key, value })
                this.addDatabase(typeof value === 'string' ? JSON.parse(value) : value)
            } else {
                this.removeDatabase(typeof value === 'string' ? JSON.parse(value) : value)
            }
        } catch (err) {
            console.log(err, JSON.stringify(value, null, 2))
        }
    }

    async initialise() {
        await this.preloadGlobalRealms()
        for(let realm of await this.getPinnedRealms()) {
            await this.addDatabase(realm)
        }
    }

    async preloadGlobalRealms() {
        for(let realm of Object.values(GLOBAL_REALMS)) {
            realm.global = true
            await this.addDatabase(realm)
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
        if(realmData.type === REALM_TYPES.NONE) {
            this.put(realmData.id, JSON.stringify(realmData))
            await this.addDatabase(realmData)
        }
    }

    getDatabase(realmData) {
        return this.realms[realmData.id || realmData]
    }

    async addDatabase(realmData, onProgress) {
        return this.realms[realmData.id] || await this._createDatabase(realmData, onProgress)
    }

    async _createDatabase(realmData, onProgress) {
        const database = new RealmDatabase(new RealmData(realmData), this.assetSync, this.dhtProtocol)
        await database.start(onProgress)
        this.realms[realmData.id] = database
        return database
    }

    async removeDatabase(realmData) {
        if(this.realms[realmData.id]) {
            await this.assetSync.dhtPlugin.removeDHT(this.dhtProtocol + realmData.id)// + this.dhtVersion)
            await this.realms[realmData.id].stop()
            delete this.realms[realmData.id]
        }
    }
}