import { PluginBase } from '../../PluginBase'
import { isBrowser } from '../../utils'

export class StoragePlugin extends PluginBase {

    constructor(args = {}) {
        super(args)

        this._pluginName = 'CORE_StoragePlugin'

    }

    async start(args = {}) {
        await super.start(args)
        this.storage = new (await (isBrowser ? (await import('./FileStorageBrowser')) : (await import('./FileStorageNode'))).default)()
        await this.storage.initialise()
        return true
    }

    async stop(args = {}) {
        await super.stop(args)
        return true
    }

}