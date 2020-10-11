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

    async start() {
        await this.assetSync.registerPlugin(this.libp2pPlugin)
        await this.assetSync.registerPlugin(this.networkPlugin)
        await this.assetSync.initialise()

        // ------- //

        await this.networkPlugin.joinNetwork(
            '/conjure/global', // take a peer under the hood of conjure.world
            (message, peerID) => this.emit('onMessage', message, peerID),
            (peerID) => this.emit('onPeerJoin', peerID),
            (peerID) => this.emit('onPeerLeave', peerID)
        )
    }
}