import RealmDatabase from "./RealmDatabase.js"
import { NETWORKING_OPCODES } from './Constants.js'

export default class RealmHandler {
    constructor(assetSync) {
        this.assetSync = assetSync
        this.pinnedRealms = [] // just a list of IDs

        // this is hardcoded to clean up old realms as we are in rapid development
        this.earliestRealmTime = 1599176386000
        this.databases = {}
        this.databasePlugin = assetSync.syncedDatabasePlugin

        this.dhtType = 'realm'

        this.dhtProtocol = '/conjure/realms/' // id is added between these
        // this.dhtVersion = '/1.0.0' // not currently impelemented
        this.realms = {}
    }

    // DHT data
    // key: realmId
    // value: realmData

    async get(key) {
        return await this.assetSync.dhtPlugin.get({ key: this.dhtType + ':' + key })
    }

    async put(key, value) {
        return await this.assetSync.dhtPlugin.put({ key: this.dhtType + ':' + key, value })
    }

    receiveFromDHT(key, value, from) {
        if(value) {
            this.addDatabase(typeof value === 'string' ? JSON.parse(value) : value)
        } else {
            this.removeDatabase(typeof value === 'string' ? JSON.parse(value) : value)
        }
    }

    async initialise() {
        
    }

    // async savePinnedRealms() {
    //     try {
    //         await this.assetSync.storagePlugin.writeFile('recent_realms.json', JSON.stringify(this.pinnedRealms))
    //     } catch (error) {
    //         console.log('ConjureDatabase: could not save recent realms', this.pinnedRealms, 'with error', error);
    //         // this.conjure.getGlobalHUD().log('Failed to read recent realms')
    //     }
    // }

    // async loadPinnedRealms() {
    //     try {
    //         const data = await this.assetSync.storagePlugin.readFile('recent_realms.json')
    //         if (!data)
    //             return []
    //         return JSON.parse(data) || []
    //     }
    //     catch (error) {
    //         console.log('ConjureDatabase: could not read recent realms with error', error);
    //         // this.conjure.getGlobalHUD().log('Failed to load recent realms list')
    //         return
    //     }
    // }

    // API

    // async updateRealm(realmData) {
    //     await this.addRealms(realmData)
    // }

    async forgetRealm(realmData) {
        await this.assetSync.dhtPlugin.removeLocal({ key: realmData.id })
        await this.removeDatabase(realmData)
    }

    async getRealms() {
        return await this.assetSync.dhtPlugin.getAllLocal()
    }

    async getRealmById(id) {
        return await this.get(id)
    }

    async createRealm(realmData) {
        await this.put(realmData.id, realmData)
        await this.addDatabase(realmData)
    }

    updateRealm(id) {

    }

    getDatabase(id) {
        return this.realms[id]
    }

    async addDatabase(realmData, onProgress) {
        return this.realms[realmData.id] || await this._createDatabase(realmData, onProgress)
    }

    async _createDatabase(realmData, onProgress) {
        const dht = await this.assetSync.dhtPlugin.addDHT(this.dhtProtocol + realmData.id)
        const network = await this.assetSync.networkPlugin.joinNetwork(realmData.id)
        const database = new RealmDatabase(realmData, this.assetSync.dhtPlugin, this.dhtProtocol + realmData.id, network)
        dht.on('put', (key, val, peer) => database.emit('put', key, val, peer))
        dht.on('removed', (key, val) => database.emit('removed', key, val))
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