import { PluginBase } from '../../PluginBase.js'
import { number } from '@AssetSync/common'

export class TransportBase extends PluginBase {

    constructor(options = {}) {
        super(options)
        this._pluginName = 'CORE_TransportPlugin'
    }

    async start(args = {}) {
        await super.start(args)
        return true
    }

    async stop() {
        await super.stop(args)
        return true
    }

    getPeerID() {
        return this.error('TransportPlugin not implemented')
    }

    getTransport() {
        return this.error('TransportPlugin not implemented')
    }

    joinNetwork(networkID) {
        return this.error('TransportPlugin not implemented')
    }
}