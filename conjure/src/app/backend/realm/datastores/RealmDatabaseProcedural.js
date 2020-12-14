export default async (realmDatabase) => {

    // TODO: implement DHT
    return 

    const dht = await this.assetSync.dhtPlugin.addDHT(realmDatabase.dhtProtocol)
    dht.on('put', (key, val, peer) => database.emit('put', key, val, peer))
    dht.on('removed', (key, val) => database.emit('removed', key, val))

    realmDatabase._get = async (key) => {
        return await realmDatabase.assetSync.dhtPlugin.get({ key, protocol: this.dhtProtocol })
    }

    realmDatabase._put = async (key, value) => {
        return await realmDatabase.assetSync.dhtPlugin.put({ key, value, protocol: this.dhtProtocol })
    }

    realmDatabase._getAllLocal = async () => {
        return await realmDatabase.assetSync.dhtPlugin.getAllLocal(this.dhtProtocol)
    }

    realmDatabase._removeLocal = async (key) => {
        return await realmDatabase.assetSync.dhtPlugin.removeLocal({ key, protocol: this.dhtProtocol })
    }

}