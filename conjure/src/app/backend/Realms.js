export default class Realms {
    constructor(assetSync) {
        this.assetSync = assetSync
        this.pinnedRealms = [] // just a list of IDs

        // this is hardcoded to clean up old realms as we are in rapid development
        this.earliestRealmTime = 1599176386000
        this.databases = {}
        this.databasePlugin = assetSync.syncedDatabasePlugin
    }

    async get(key) {
        return await this.assetSync.dhtPlugin.get('realm:' + key)
    }

    async put(key, value) {
        return await this.assetSync.dhtPlugin.put('realm:' + key, value)
    }

    // from DHT
    receive(realmData) {

    }

    async validateRealms() {
        
    }

    async initialise() {
        
    }

    async savePinnedRealms() {
        try {
            await this.assetSync.storagePlugin.writeFile('recent_realms.json', JSON.stringify(this.pinnedRealms))
        } catch (error) {
            console.log('ConjureDatabase: could not save recent realms', this.pinnedRealms, 'with error', error);
            // this.conjure.getGlobalHUD().log('Failed to read recent realms')
        }
    }

    async loadPinnedRealms() {
        try {
            const data = await this.assetSync.storagePlugin.readFile('recent_realms.json')
            if (!data)
                return []
            return JSON.parse(data) || []
        }
        catch (error) {
            console.log('ConjureDatabase: could not read recent realms with error', error);
            // this.conjure.getGlobalHUD().log('Failed to load recent realms list')
            return
        }
    }

    // API

    async pinRealm(realmData, pin) {
        
    }

    async updateRealm(realmData) {
        await this.addRealms(realmData)
    }

    getRealm(id) {
        return 
        for (let realm of this.pinnedRealms)
            if (realm.id === id)
                return realm
    }

    getRealms() {
        // return this.pinnedRealms
        return []
    }

    async addDatabase(id) {
        await this.databasePlugin.addDatabase(id)
    }

    async removeDatabase(id) {
        await this.databasePlugin.removeDatabase(id)
    }

    // todo: merge with addDatabase and fix
    async subscribe(realmID, additionCallback, removalCallback) {
        // if (this.databasePlugin.getDatabase(realmID))
        //     this.databasePlugin.getDatabase(realmID).registerCallbacks(additionCallback, removalCallback)
    }

    async unsubscribe(realmID) {
        if (this.databasePlugin.getDatabase(realmID))
            this.databasePlugin.getDatabase(realmID).unregisterCallbacks()
    }

    async createObject(realmID, uuid, data) {
        if (!this.databasePlugin.getDatabase(realmID)) return
        return await this.databasePlugin.getDatabase(realmID).addEntry(uuid, data)
    }

    async updateObject(realmID, uuid, data) {
        if (!this.databasePlugin.getDatabase(realmID)) return
        return await this.databasePlugin.getDatabase(realmID).addEntry(uuid, data)
    }

    async destroyObject(realmID, uuid) {
        if (!this.databasePlugin.getDatabase(realmID)) return
        return await this.databasePlugin.getDatabase(realmID).removeEntry(uuid)
    }

    async getObjects(realmID) {
        if (!this.databasePlugin.getDatabase(realmID)) return []
        return await this.databasePlugin.getDatabase(realmID).getAllValues()
    }
}