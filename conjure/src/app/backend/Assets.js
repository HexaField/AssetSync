export default class Assets {

    constructor(assetSync) {
        this.assetSync = assetSync
        this.dhtProtocol = '/assets/'
    }

    async get(key) {
        return await this.assetSync.dhtPlugin.get(this.dhtProtocol + key)
    }

    async put(key, value) {
        return await this.assetSync.dhtPlugin.put(this.dhtProtocol + key, value)
    }

    receiveFromDHT(key, value, from) {
        if(value) {
           
        } else {

        }
    }

}