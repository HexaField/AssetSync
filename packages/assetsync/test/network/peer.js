import AssetSync from '../../src/index.js'
import { Libp2pPlugin } from '../../src/plugins/libp2p/index.js'
import { NetworkPlugin } from '../../src/plugins/network/index.js'
import { EventEmitter } from 'events'

export default class Peer extends EventEmitter {

    constructor(libp2p) {
        super()
        this.assetSync = new AssetSync()
        this.libp2pPlugin = new Libp2pPlugin({ libp2p })
        this.networkPlugin = new NetworkPlugin({ libp2pPlugin: this.libp2pPlugin })
    }

    async start(networkID) {
        await this.assetSync.registerPlugin(this.libp2pPlugin)
        await this.assetSync.registerPlugin(this.networkPlugin)
        await this.assetSync.initialise()

        // ------- //

        const network = await this.networkPlugin.joinNetwork(networkID)
        network.on('onMessage', (message, peerID) => this.emit('onMessage', message, peerID))
        network.on('onPeerJoin', (peerID) => this.emit('onPeerJoin', peerID))
        network.on('onPeerLeave', (peerID) => this.emit('onPeerLeave', peerID))
    }
}