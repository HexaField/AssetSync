import DataHandler from '../../src/index.js'
import { WebsocketPlugin } from '../../src/plugins/websocket/index.js'
import { EventEmitter } from 'events'

export default class Peer extends EventEmitter {

    constructor() {
        super()
        this.assetSync = new DataHandler()
        this.websocketPlugin = new WebsocketPlugin()
    }

    async start() {
        await this.assetSync.registerPlugin(this.websocketPlugin)
        await this.assetSync.initialise()

        // ------- //

    }
}