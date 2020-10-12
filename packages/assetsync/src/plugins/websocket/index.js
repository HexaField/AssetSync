import PeerSync from '@AssetSync/PeerSync'
import { PluginBase } from '../../PluginBase.js'

export class WebsocketPlugin extends PluginBase {

    constructor(options) {
        super(options)
        this._pluginName = 'CORE_WebsocketPlugin'

        this.networks = {}

        this._peerSync = new PeerSync()
    }

    async start(args = {}) {
        await super.start(args)
        await this._peerSync.initialise(this._options.forceSlave)
        this._peerSync.on('start', (isMaster) => { this.emit('start', isMaster) })
        return true
    }

    async stop(args = {}) {
        await super.stop(args)
        return true
    }
}