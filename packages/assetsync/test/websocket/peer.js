import DataHandler from '../../src/index.js'
import { WebsocketPlugin } from '../../src/plugins/websocket/index.js'
import { EventEmitter } from 'events'

export default class Peer extends EventEmitter {

    constructor() {
        super()
    }

    async start() {
        const dataHandler = new DataHandler()

        const websocketPlugin = new WebsocketPlugin()

        await dataHandler.registerPlugin(websocketPlugin)

        await dataHandler.initialise()

        // ------- //
        
    }
}