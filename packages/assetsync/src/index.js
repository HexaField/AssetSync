export { Libp2pPlugin } from './plugins/libp2pTransport/index.js'
export { NetworkPlugin } from './plugins/network/index.js'
export { DHTPlugin } from './plugins/dht/index.js'

export default class AssetSync {

    constructor() {
        this._plugins = {}
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

    /* Unused for now

    async cleanupPlugins() {
        console.log('Stopping plugins...')
        for (let plugin of this.getPlugins())
            await plugin.stop()
    } */

    // INITIALISE

    async initialise() {
        await this._initialisePlugins()
    }

    async _initialisePlugins() {
        for (let plugin of this.getPlugins()) {
            try {
                await plugin.start()
                console.log('Successfully loaded plugin ' + plugin.getName())
            } catch(error) {
                console.error('Failed to load plugin ' + plugin.getName() + ' with error ' + error)
            }
        }
    }
}