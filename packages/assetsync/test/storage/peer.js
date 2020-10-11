import AssetSync from '../../src/index.js'
import { StoragePlugin } from '../../src/plugins/storage/index.js'
import { EventEmitter } from 'events'

export default class Peer extends EventEmitter {

    constructor(options = {}) {
        super()
        this.assetSync = new AssetSync()
        this.storagePlugin = new StoragePlugin(options)
    }

    async start() {
        await this.assetSync.registerPlugin(this.storagePlugin)
        await this.assetSync.initialise()
        // ------- //
        // be careful! make sure yo set the root dir and clean it up after!
    }
}