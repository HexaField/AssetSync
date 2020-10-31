import { PluginBase } from '../../PluginBase.js'

import uint8ArrayFromString from 'uint8arrays/from-string.js'
import uint8ArrayToString from 'uint8arrays/to-string.js'


export class DHTPlugin extends PluginBase {

    constructor(options = {}) {
        super(options)
        this._pluginName = 'CORE_DHTPlugin'
        this._transportPlugin = options.transportPlugin

        // this._cache = {} // cache?

        // this._dhtEvents = options.networkEvents || {}
    }

    async start(args = {}) {
        await super.start(args)
        return true
    }

    async stop(args = {}) {
        await super.stop(args)
        return true
    }

    /**
     * 
     * @param {string} key 
     */
    async get(key) {
        const keyArray = uint8ArrayFromString(key)
        const result = await this._transportPlugin.getTransport().contentRouting.get(keyArray)
        return uint8ArrayToString(result)
    }

    /**
     * 
     * @param {string} key 
     * @param {string} value 
     */
    async put(key, value) {
        const keyArray = uint8ArrayFromString(key)
        const valueArray = uint8ArrayFromString(value)
        return await this._transportPlugin.getTransport().contentRouting.put(keyArray, valueArray)
    }
}