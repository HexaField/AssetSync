export default class Realms {
    constructor(assetSync) {
        this.assetSync = assetSync
        this.pinnedRealms = [] // just a list of IDs

        // this is hardcoded to clean up old realms as we are in rapid development
        this.earliestRealmTime = 1599176386000
        this.databases = {}
        this.databasePlugin = assetSync.syncedDatabasePlugin

        this.dhtType = 'realm'

        this.dhtProtocol = '/conjure/realm-' // id is added between these
        this.dhtVersion = '/1.0.0'
    }

    async get(key) {
        return await this.assetSync.dhtPlugin.get(this.dhtType + ':' + key)
    }

    async put(key, value) {
        return await this.assetSync.dhtPlugin.put(this.dhtType + ':' + key, value)
    }

    receiveFromDHT(key, value, from) {
        if(value) {
            this.addDatabase(key)
        } else {
            this.removeDatabase(key)
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

    // async pinRealm(realmData, pin) {
        
    // }

    // async updateRealm(realmData) {
    //     await this.addRealms(realmData)
    // }

    getRealmById(id) {
        return this.get(id)
    }

    getDatabase(id) {
        // return this.databasePlugin.getDatabase(id)
        return this.assetSync.dhtPlugin.getDHT(this.dhtProtocol + id + this.dhtVersion)
    }

    addDatabase(id) {
        // return await this.databasePlugin.addDatabase(id)
        return this.assetSync.dhtPlugin.addDHT(this.dhtProtocol + id + this.dhtVersion)
    }

    removeDatabase(id) {
        // await this.databasePlugin.removeDatabase(id)
        this.assetSync.dhtPlugin.removeDHT(this.dhtProtocol + id + this.dhtVersion)
    }
}