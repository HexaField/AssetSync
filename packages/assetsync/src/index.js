export { Libp2pPlugin } from './plugins/libp2pTransport/index.js'
export { NetworkPlugin } from './plugins/network/index.js'
export { DHTPlugin } from './plugins/dht/index.js'

const BASE_OPTIONS = {
    enableLogging: true
}

export default class AssetSync {

    constructor(options = {}) {
        this._plugins = {}
        this._options = Object.assign({}, BASE_OPTIONS, options)
    }

    // PRE-INIT & UTIL

    async register(plugins = {}) {
        for(let plugin of Object.keys(plugins)) {
            await plugins[plugin].register(this)
            this._plugins[plugins[plugin].getName()] = plugins[plugin]
            this[plugin] = plugins[plugin]
        }
    }

    getPlugin(pluginName) {
        return this._plugins[pluginName]
    }

    getPlugins() {
        return Object.values(this._plugins)
    }

    log(...message) {
        if (this._options.enableLogging)
            console.log(new Date().toTimeString().substring(0, 8) + ":", ...message)
    }

    warn(...message) {
        if (this._options.enableLogging)
            console.warn(new Date().toTimeString().substring(0, 8) + ":", ...message)
    }

    error(...message) {
        if (this._options.enableLogging)
            console.error(new Date().toTimeString().substring(0, 8) + ":", ...message)
    }

    /* Unused for now

    async cleanupPlugins() {
        console.log('Stopping plugins...')
        for (let plugin of this.getPlugins())
            await plugin.stop()
    } */

    // INITIALISE

    async initialise() {
        await this._initialisePlugins()

        this.log('Successfully loaded AssetSync!')
    }

    async _initialisePlugins() {
        for (let plugin of this.getPlugins()) {
            try {
                await plugin.start()
                this.log('Successfully loaded plugin ' + plugin.getName())
            } catch(error) {
                this.error('Failed to load plugin ' + plugin.getName() + ' with error ' + error)
            }
        }
    }
}