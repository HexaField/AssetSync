import RealmDatabase from "./realm/RealmDatabase.js"
import RealmData, { GLOBAL_REALMS, REALM_TYPES } from './realm/RealmData.js'
import { getParams } from "@AssetSync/common"

const verbose = getParams().verbose !== undefined
const network = getParams().network === 'true'
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

    _doValidation(realmData) {

        if(realmData === undefined) return false
        if(realmData.id === undefined) return false
        if(realmData.name === undefined) return false

        return true
    }

    validateRealm(realmData) {
        let dataToValidate = realmData
        if(typeof realmData === 'string') {
            try {
                dataToValidate = JSON.parse(realmData)
            } catch (err) { 
                return
            }
        }
        const success = this._doValidation(dataToValidate)
        if(success) {
            return realmData
        }
        return
    }

    async get(key, saveLocal) {
        try {
            const value = await this.assetSync.dhtPlugin.get({ key: this.dhtProtocol + key })
            if(!this.validateRealm(value))
                return
            if(value) {
                if(saveLocal) {
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
        try {
            if(this.validateRealm(value)) {
                this.assetSync.dhtPlugin.putLocal({ key: this.dhtProtocol + key, value })
                this.addDatabase(typeof value === 'string' ? JSON.parse(value) : value, undefined, network)
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
            await this.addDatabase(realm, undefined, network)
        }
    }

    async preloadGlobalRealms() {
        for(let realm of Object.values(GLOBAL_REALMS)) {
            realm.global = true
            await this.addDatabase(realm, undefined, network)
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
        return this.realms[realmData.id] || await this._createDatabase(realmData, verbose ? ((...messages) => { console.log('Loading Realm ' + realmData.id + ':', ...messages) }) : onProgress, forceSync)
    }

    async _createDatabase(realmData, onProgress, forceSync) {
        const database = new RealmDatabase(new RealmData(realmData), this.assetSync, this.dhtProtocol)
        await database.start(onProgress, forceSync)
        this.realms[realmData.id] = database
        return database
    }

    async removeDatabase(realmData) {
        const id = typeof realmData === 'object' ? realmData.id : realmData
        if(this.realms[id]) {
            await this.assetSync.dhtPlugin.removeDHT(this.dhtProtocol + id)// + this.dhtVersion)
            await this.realms[id].stop()
            delete this.realms[id]
        }
    }
}