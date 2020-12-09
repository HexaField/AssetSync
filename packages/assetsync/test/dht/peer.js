import AssetSync from '../../src/index.js'
import { Libp2pPlugin } from '../../src/plugins/libp2pTransport/index.js'
import { DHTPlugin } from '../../src/plugins/dht/index.js'
import { EventEmitter } from 'events'

// import KadDHT from '../../../common/src/libp2pkaddht/src/index.js'
import KadDHT from 'libp2p-kad-dht'
import { MemoryDatastore } from 'interface-datastore'
export default class Peer extends EventEmitter {

    constructor(libp2p) {
        super()
        this.assetSync = new AssetSync()
        this.libp2pPlugin = new Libp2pPlugin({ libp2p })
        this.dhtPlugin = new DHTPlugin({ transportPlugin: this.libp2pPlugin, dhtConstructor: KadDHT, datastoreConstructor: MemoryDatastore, repoPath: './test/dht/repo/' })
    }

    async start() {
        await this.assetSync.register({ libp2pPlugin: this.libp2pPlugin, dhtPlugin: this.dhtPlugin })
        await this.assetSync.initialise()
    }
}