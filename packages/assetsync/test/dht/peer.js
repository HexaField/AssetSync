import AssetSync from '../../src/index.js'
import { Libp2pPlugin } from '../../src/plugins/libp2pTransport/index.js'
import { DHTPlugin } from '../../src/plugins/dht/index.js'
import { EventEmitter } from 'events'

export default class Peer extends EventEmitter {

    constructor(libp2p) {
        super()
        this.assetSync = new AssetSync()
        this.libp2pPlugin = new Libp2pPlugin({ libp2p })
        this.dhtPlugin = new DHTPlugin({ transportPlugin: this.libp2pPlugin })
    }

    async start() {
        await this.assetSync.register({ libp2pPlugin: this.libp2pPlugin, dhtPlugin: this.dhtPlugin })
        await this.assetSync.initialise()
    }
}