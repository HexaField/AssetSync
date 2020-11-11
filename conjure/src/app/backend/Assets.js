export default class Assets {

    constructor(assetSync, type) {
        this.assetSync = assetSync
        this.type = 'assets'
    }

    async get(key) {
        return await this.assetSync.dhtPlugin.get(this.type + '/' + key)
    }

    async put(key, value) {
        return await this.assetSync.dhtPlugin.put(this.type + '/' + key, value)
    }
}