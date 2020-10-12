import AssetSync from '../../src/index.js'
import { WebsocketPlugin } from '../../src/plugins/websocket/index.js'
import { EventEmitter } from 'events'

export default class Peer extends EventEmitter {

    constructor(forceSlave) {
        super()
        this.assetSync = new AssetSync()
        this.websocketPlugin = new WebsocketPlugin({ forceSlave })
    }

    async start() {
        await this.assetSync.registerPlugin(this.websocketPlugin)
        await this.assetSync.initialise()

        this.websocketPlugin.on('start', (isMaster) => { 
            this.emit('start', isMaster) 
        })

        // ------- //

    }
}