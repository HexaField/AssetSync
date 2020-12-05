import { PluginBase } from '../../PluginBase.js'
import { SyncedDatabase } from './SyncedDatabase.js'

export class SyncedDatabasePlugin extends PluginBase {

    constructor(options = {}) {
        super(options)
        this._pluginName = 'CORE_SyncedDatabasePlugin'

        this._databases = {}
    }

    async start(args = {}) {
        await super.start(args)
        return true
    }

    async stop() {
        await super.stop(args)
        return true
    }

    getDatabase(id) {
        return this._databases[id]
    }

    async addDatabase(id)
    {
        if(this._databases[id]) return this._databases[id]
        const database = new SyncedDatabase(String(id), this._options.networkPlugin, this._options.storagePlugin)
        await database.initialise()
        this._databases[id] = database
        return database
    }

    async removeDatabase(id)
    {
        if(!this._databases[id]) return
        await this._databases[id].close()
        delete this._databases[id]
    }
}