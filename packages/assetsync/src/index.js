export default class AssetSync {

    constructor() {
        this._plugins = {}
    }

    // PRE-INIT & UTIL

    async registerPlugin(plugin) {
        await plugin.register(this)
        this._plugins[plugin.getName()] = plugin
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
        await this.initialisePlugins()
    }

    async initialisePlugins() {
        for (let plugin of this.getPlugins()) {
            if (await plugin.start())
                console.log('Successfully loaded plugin ' + plugin.getName())
        }
    }
}