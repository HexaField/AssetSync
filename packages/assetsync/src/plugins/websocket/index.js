import PeerSync from '@AssetSync/PeerSync'
import { PluginBase } from '../../PluginBase.js'

export class WebsocketPlugin extends PluginBase {

    constructor(options) {
        super(options)
        this._pluginName = 'CORE_WebsocketPlugin'

        this.networks = {}
    }

    async register(args = {}) {
    }

    async start(args = {}) {
        await super.start(args)
        return true
    }

    async stop(args = {}) {
        await super.stop(args)
        return true
    }

}