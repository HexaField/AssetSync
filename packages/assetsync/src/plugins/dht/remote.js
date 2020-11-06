import { DHTPlugin } from './index.js'

export class RemoteDHTPlugin extends DHTPlugin {

    constructor(options = {}) {
        super(options)
        this._pluginName = 'CORE_RemoteNetworkPlugin'
    }

    setTarget(target) {
        this._target = target
    }

    async start(args = {}) {
        await super.start(args)
        this._target.addEventListener('dhtEvent', (event, ...data) => {
            this.emit(event, ...data)
        })
    }

    async stop(args = {}) {
        await super.stop(args)
        await this.leaveAllNetworks()
    }

    async get(key) {
        return await this.sendEvent('get', key)
    }

    async put(key, value) {
        return await this.sendEvent('get', [key, value])
    }

    async sendEvent(protocol, args) {
        return await this._target.makeRequest(protocol, args)
    }
}