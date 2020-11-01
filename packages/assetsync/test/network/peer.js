import AssetSync from '../../src/index.js'
import { Libp2pPlugin } from '../../src/plugins/libp2pTransport/index.js'
import { NetworkPlugin } from '../../src/plugins/network/index.js'
import { EventEmitter } from 'events'

export default class Peer extends EventEmitter {

    constructor(libp2p) {
        super()
        this.assetSync = new AssetSync()
        this.libp2pPlugin = new Libp2pPlugin({ libp2p })
        this.networkPlugin = new NetworkPlugin({ transportPlugin: this.libp2pPlugin })
    }

    async start(networkID) {
        await this.assetSync.register({ libp2pPlugin: this.libp2pPlugin, networkPlugin: this.networkPlugin })
        await this.assetSync.initialise()

        // ------- //

        this.network = await this.networkPlugin.joinNetwork(networkID)
        this.network.on('onMessage', (...args) => this.emit('onMessage', ...args))
        this.network.on('onPeerJoin', (...args) => this.emit('onPeerJoin', ...args))
        this.network.on('onPeerLeave', (...args) => this.emit('onPeerLeave', ...args))
    }
}