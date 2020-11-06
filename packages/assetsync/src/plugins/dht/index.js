import { PluginBase } from '../../PluginBase.js'

import uint8ArrayFromString from 'uint8arrays/from-string.js'
import uint8ArrayToString from 'uint8arrays/to-string.js'

import diff from 'hyperdiff'


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
        this.pollChanges()
        return true
    }

    async stop(args = {}) {
        await super.stop(args)
        return true
    }

    pollChanges() {
        this.pollInterval = setInterval(() => {
            const changes = diff([this._data], [this._transportPlugin.getTransport()._dht.datastore.data])
            this._data = this._transportPlugin.getTransport()._dht.datastore.data
            changes.added.forEach((entry) => {
                this.emit('dht:add', {
                    key: uint8ArrayToString(Object.keys(entry)[0]),
                    value: uint8ArrayToString(Object.values(entry)[0])
                })
            })
            changes.removed.forEach((entry) => {
                this.emit('dht:remove', {
                    key: uint8ArrayToString(Object.keys(entry)[0]),
                    value: uint8ArrayToString(Object.values(entry)[0])
                })
            })
        }, this._options.pollInterval || 1000)
    }

    /**
     * 
     * @param {string} key 
     */
    async get(key) {
        const keyArray = uint8ArrayFromString(key)
        const result = await this._transportPlugin.getTransport()._dht.get(keyArray)
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
        return await this._transportPlugin.getTransport()._dht.put(keyArray, valueArray)
    }
}