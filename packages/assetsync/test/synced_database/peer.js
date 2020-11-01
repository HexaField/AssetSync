import { EventEmitter } from 'events'

import AssetSync from '../../src/index.js'

import { Libp2pPlugin } from '../../src/plugins/libp2pTransport/index.js'
import { StoragePlugin } from '../../src/plugins/storage/index.js'
import { NetworkPlugin } from '../../src/plugins/network/index.js'
import { SyncedDatabasePlugin } from '../../src/plugins/syncedDatabase/index.js'

export default class Peer extends EventEmitter {
    
    constructor(libp2p, rootDirectory) {
        super()
        this.assetSync = new AssetSync()
        this.libp2pPlugin = new Libp2pPlugin({ libp2p })
        this.storagePlugin = new StoragePlugin({ rootDirectory })
        this.networkPlugin = new NetworkPlugin({ transportPlugin: this.libp2pPlugin })
        this.syncedDatabasePlugin = new SyncedDatabasePlugin({
            storagePlugin: this.storagePlugin,
            networkPlugin: this.networkPlugin
        })
    }

    async start() {
        await this.assetSync.register({
            storagePlugin: this.storagePlugin,
            networkPlugin: this.networkPlugin,
            syncedDatabasePlugin: this.syncedDatabasePlugin
        })
        await this.assetSync.initialise()
    }
}