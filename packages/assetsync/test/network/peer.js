import DataHandler from '../../src/index.js'
import { Libp2pPlugin } from '../../src/plugins/libp2p/index.js'
import { NetworkPlugin } from '../../src/plugins/network/index.js'
import { EventEmitter } from 'events'

export default class Peer extends EventEmitter {

    constructor() {
        super()
    }

    async start(libp2p) {
        const dataHandler = new DataHandler()

        const libp2pPlugin = new Libp2pPlugin({ libp2p })
        const networkPlugin = new NetworkPlugin({ libp2pPlugin })

        await dataHandler.registerPlugin(libp2pPlugin)
        await dataHandler.registerPlugin(networkPlugin)

        await dataHandler.initialise()

        // ------- //

        await networkPlugin.joinNetwork(
            '/conjure/global', // take a peer under the hood of conjure.world
            (message, peerID) => this.emit('onMessage', message, peerID),
            (peerID) => this.emit('onPeerJoin', peerID),
            (peerID) => this.emit('onPeerLeave', peerID)
        )
    }
}