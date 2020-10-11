import DataHandler from '../../src/index.js'
import { StoragePlugin } from '../../src/plugins/storage/index.js'
import { EventEmitter } from 'events'

export default class Peer extends EventEmitter {

    constructor() {
        super()
    }

    async start() {
        const dataHandler = new DataHandler()

        const storagePlugin = new StoragePlugin()

        await dataHandler.registerPlugin(storagePlugin)

        await dataHandler.initialise()

        // ------- //

        // be careful! make sure yo set the root dir and clean it up after!

    }
}