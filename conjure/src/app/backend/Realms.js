export default class Realms {
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
    }

    async get(key) {
        return await this.assetSync.dhtPlugin.get({ key: this.dhtType + ':' + key })
    }

    async put(key, value) {
        return await this.assetSync.dhtPlugin.put({ key: this.dhtType + ':' + key, value })
    }

    receiveFromDHT(key, value, from) {
        console.log('receiveFromDHT', key, value, from)
        if(value) {
            this.addDatabase(key)
        } else {
            this.removeDatabase(key)
        }
    }

    async initialise() {
        console.log(await this.addDatabase('Lobby'))
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

    async getRealms() {
        return await this.assetSync.dhtPlugin.getAllLocal()
    }

    async getRealmById(id) {
        return await this.get(id)
    }

    async createRealm(realmData) {
        await this.put(realmData.id, realmData)
        // await this.addDatabase(realmData.id)
    }

    updateRealm(id) {

    }

    getDatabase(id) {
        // return this.databasePlugin.getDatabase(id)
        return this.assetSync.dhtPlugin.getDHT(this.dhtProtocol + id)// + this.dhtVersion)
    }

    async addDatabase(id) {
        // return await this.databasePlugin.addDatabase(id)
        return await this.assetSync.dhtPlugin.addDHT(this.dhtProtocol + id)// + this.dhtVersion)
    }

    async removeDatabase(id) {
        // await this.databasePlugin.removeDatabase(id)
        await this.assetSync.dhtPlugin.removeDHT(this.dhtProtocol + id)// + this.dhtVersion)
    }
}