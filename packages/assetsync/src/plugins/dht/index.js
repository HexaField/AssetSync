import { PluginBase } from '../../PluginBase.js'

import uint8ArrayFromString from 'uint8arrays/from-string.js'
import uint8ArrayToString from 'uint8arrays/to-string.js'

export class DHTPlugin extends PluginBase {

    constructor(options = {}) {
        super(options)
        this._pluginName = 'CORE_DHTPlugin'
        this._transportPlugin = options.transportPlugin

        this._data = {}
    }

    async start(args = {}) {
        await super.start(args)
        
        this._dht = this._transportPlugin.getTransport()._dht
        if (!this._dht)
            throw new Error('No dht found!')

        this._dht.onPut = (record, peerId) => {
            this.emit('put', uint8ArrayToString(record.key), uint8ArrayToString(record.value), peerId.toB58String())
        }
        this._dht.onRemoved = (record) => {
            this.emit('removed', uint8ArrayToString(record.key), uint8ArrayToString(record.value))
        }

    }

    async stop(args = {}) {
        await super.stop(args)
    }

    /**
     * 
     * @param {string} key 
     */
    async get(key) {
        const keyArray = uint8ArrayFromString(key)
        const result = await this._dht.get(keyArray)
        return uint8ArrayToString(result)
    }

    /**
     * 
     * @param {string} key 
     * @param {string} value 
     */
    async put(key, value, minPeers) {
        return await this._dht.put(uint8ArrayFromString(key), uint8ArrayFromString(value), { minPeers })
    }
}