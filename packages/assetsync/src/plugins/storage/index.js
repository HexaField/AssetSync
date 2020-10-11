import { PluginBase } from '../../PluginBase.js'
import { isBrowser } from '@AssetSync/common'

export class StoragePlugin extends PluginBase {

    constructor(options = {}) {
        super(options)
        
        this._pluginName = 'CORE_StoragePlugin'
        this._rootDirectory = options.rootDirectory || '/'
        this._initialiseDirectory = options._initialiseDirectory
    }

    async start(args = {}) {
        await super.start(args)
        this.storage = new (await (isBrowser ? (await import('./FileStorageBrowser.js')) : (await import('./FileStorageNode.js'))).default)()
        this.storage.setRootDirectory(this._rootDirectory)
        if(this._initialiseDirectory)
            await this.makeDirectory(this._rootDirectory)
        return true
    }

    async stop(args = {}) {
        await super.stop(args)
        return true
    }

    async makeDirectory(directory) {
        return await this.storage.makeDirectory(directory)
    }
    
    async exists(directory) {
        return await this.storage.exists(directory)
    }
    
    async readFile(filename) {
        return await this.storage.readFile(filename)
    }
    
    async writeFile(filename, data) {
        return await this.storage.writeFile(filename, data)
    }
    
    async removeFile(filename) {
        return await this.storage.removeFile(filename)
    }
    
    async removeDirectory(filename) {
        return await this.storage.removeDirectory(filename)
    }

    async getFiles(directory) {
        return await this.storage.getFiles(directory)
    }

    async getRecursively(directory) {
        return await this.storage.getRecursively(directory)
    }
}