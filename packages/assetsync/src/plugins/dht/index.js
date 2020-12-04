import { PluginBase } from '../../PluginBase.js'

import uint8ArrayFromString from 'uint8arrays/from-string.js'
import uint8ArrayToString from 'uint8arrays/to-string.js'

export class DHTPlugin extends PluginBase {

    constructor(options = {}) {
        super(options)
        this._pluginName = 'CORE_DHTPlugin'
        this._transportPlugin = options.transportPlugin

        this._data = {}

        // this._dhtEvents = options.networkEvents || {}
    }

    async start(args = {}) {
        await super.start(args)

        if (!this._transportPlugin.dht)
            throw new Error('No dht found!')

        this._transportPlugin.dht.onPut = (record, peerId) => {
            this.emit('put', uint8ArrayToString(record.key), uint8ArrayToString(record.value), peerId.toB58String())
        }
        this._transportPlugin.dht.onRemoved = (record) => {
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
        const result = await this._transportPlugin.dht.get(keyArray)
        return uint8ArrayToString(result)
    }

    /**
     * 
     * @param {string} key 
     * @param {string} value 
     */
    async put(key, value, minPeers) {
        return await this._transportPlugin.dht.put(uint8ArrayFromString(key), uint8ArrayFromString(value), { minPeers })
    }
}