export default class Assets {

    constructor(assetSync) {
        this.assetSync = assetSync
        this.dhtType = 'assets'
    }

    async get(key) {
        return await this.assetSync.dhtPlugin.get(this.dhtType + ':' + key)
    }

    async put(key, value) {
        return await this.assetSync.dhtPlugin.put(this.dhtType + ':' + key, value)
    }

    receiveFromDHT(key, value, from) {
        if(value) {
           
        } else {

        }
    }

}