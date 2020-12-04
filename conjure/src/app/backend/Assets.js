export default class Assets {

    constructor(assetSync) {
        this.assetSync = assetSync
    }

    async get(key) {
        return await this.assetSync.dhtPlugin.get('assets:' + key)
    }

    async put(key, value) {
        return await this.assetSync.dhtPlugin.put('assets:' + key, value)
    }
}