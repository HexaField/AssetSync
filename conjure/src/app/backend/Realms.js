export default class Realms {
    constructor(assetSync) {
        this.assetSync = assetSync
        this.pinnedRealms = [] // just a list of IDs

        // this is hardcoded to clean up old realms as we are in rapid development
        this.earliestRealmTime = 1599176386000
        this.databases = {}
    }

    async get(key) {
        return await this.assetSync.dhtPlugin.get('realm/' + key)
    }

    async put(key, value) {
        return await this.assetSync.dhtPlugin.put('realm/' + key, value)
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
        if (this.databases[id]) return
        this.databases[id] = new SyncedDatabase(this.dataHandler.getNetworkManager(), 'realms/' + String(id), this.dataHandler.getLocalFiles())
        await this.databases[id].initialise()
    }

    async removeDatabase(id) {
        if (!this.databases[id]) return
        await this.databases[id].close()
        delete this.databases[id]
    }

    // todo: merge with addDatabase and fix
    async subscribe(realmID, additionCallback, removalCallback) {
        // if (this.databases[realmID])
        //     this.databases[realmID].registerCallbacks(additionCallback, removalCallback)
    }

    async unsubscribe(realmID) {
        if (this.databases[realmID])
            this.databases[realmID].unregisterCallbacks()
    }

    async createObject(realmID, uuid, data) {
        if (!this.databases[realmID]) return
        return await this.databases[realmID].addEntry(uuid, data)
    }

    async updateObject(realmID, uuid, data) {
        if (!this.databases[realmID]) return
        return await this.databases[realmID].addEntry(uuid, data)
    }

    async destroyObject(realmID, uuid) {
        if (!this.databases[realmID]) return
        return await this.databases[realmID].removeEntry(uuid)
    }

    async getObjects(realmID) {
        if (!this.databases[realmID]) return []
        return await this.databases[realmID].getAllValues()
    }
}