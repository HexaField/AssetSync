export { TransportBase } from './plugins/transport/index.js'
export { Libp2pPlugin } from './plugins/libp2pTransport/index.js'

export { NetworkPlugin } from './plugins/network/index.js'
export { RemoteNetworkPlugin } from './plugins/network/remote.js'

export { DHTPlugin } from './plugins/dht/index.js'
export { RemoteDHTPlugin } from './plugins/dht/remote.js'

export { StoragePlugin } from './plugins/storage/index.js'
export { SyncedDatabasePlugin } from './plugins/syncedDatabase/index.js'

export { ConnectionPlugin } from './plugins/connection/index.js'

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
        this._callbacks = {}
    } */

    // INITIALISE

    async initialise() {
        await this._initialisePlugins()
    }

    async _initialisePlugins() {
        for (let plugin of this.getPlugins()) {
            if (await plugin.start())
                console.log('Successfully loaded plugin ' + plugin.getName())
        }
    }
}