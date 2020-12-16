import RealmDatabase from "./realm/RealmDatabase.js"
import RealmData, { GLOBAL_REALMS } from './realm/RealmData.js'
import { isNode } from "@AssetSync/common"

export default class RealmHandler {
    constructor(assetSync) {
        this.assetSync = assetSync
        
        this.databasePlugin = assetSync.syncedDatabasePlugin

        this.dhtProtocol = '/realm/' // id is added between these
        // this.dhtVersion = '/1.0.0' // not currently impelemented
        this.realms = {}
    }

    // DHT data
    // key: realmId
    // value: realmData

    async get(key) {
        return JSON.parse(await this.assetSync.dhtPlugin.get({ key: this.dhtProtocol + key }))
    }

    async put(key, value) {
        return await this.assetSync.dhtPlugin.put({ key: this.dhtProtocol + key, value, minPeers: '1' })
    }

    receiveFromDHT(key, value, from) {
        try {
            if(value) {
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
        for(let realm of await this.getRealms()) {
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
        await this.assetSync.dhtPlugin.removeLocal({ key: realmData.id })
        await this.removeDatabase(realmData)
    }

    async getRealms() {
        return (await this.assetSync.dhtPlugin.getAllLocal())
            .filter((realm) => { return realm.key.substring(0, 7) === '/realm/' })
            .map((realm) => { return JSON.parse(realm.value) })
    }

    async getRealmById(id) {
        return await this.get(id)
    }

    async createRealm(realmData) {
        // await this.put(realmData.id, realmData) // takes a long time with current dht
        this.put(realmData.id, JSON.stringify(realmData))
        await this.addDatabase(realmData)
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