import * as utils from '@AssetSync/common/src/datastore-utils.js'
import uint8ArrayFromString from 'uint8arrays/from-string.js'
import uint8ArrayToString from 'uint8arrays/to-string.js'

export default class ClientDatastore {
    
    constructor(assetSync) {
        this.assetSync = assetSync
    }

    async initialise() {
        this.database = await this.assetSync.transportPlugin._libp2p.repo.openDatastore('/client')
    }

    async get(key) {
        if(!key) return
        try {
            const keyArray = uint8ArrayFromString(key)
            const entry = await this.database.get(utils.bufferToKey(keyArray))
            const record = utils.decodeRecord(entry)
            return uint8ArrayToString(record.value)
        }
        catch (error) {
            console.log('Datastore: could not get', key, ' with error', error);
            return
        }
    }

    async put(key, data) {
        if(!key) return
        try {
            const keyArray = uint8ArrayFromString(key)
            const valueArray = uint8ArrayFromString(data)
            const record = await utils.createPutRecord(keyArray, valueArray)
            await this.database.put(utils.bufferToKey(keyArray), record)

            // this.conjure.getGlobalHUD().log('Successfully saved profile')
            return true
        } catch (error) {
            console.log('Datastore: could not save', key, data, 'with error', error);
            return false
        }
    }

    async del(key) {
        return this.put(key)
    }
}