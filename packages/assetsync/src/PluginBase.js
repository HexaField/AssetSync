import EventEmitter from "events"

export class PluginBase extends EventEmitter {

    constructor(options = {}) {
        super()

        this._pluginName = 'Unnamed Plugin - ' + Date.now()
        this._running = false
        this._options = options
    }

    register(assetSync) {
        this._assetSync = assetSync
    }

    log(...message) {
        if (this._assetSync._options.enableLogging)
            this._assetSync.log(this.getName() + ':', ...message)
    }

    warn(...message) {
        if (this._assetSync._options.enableLogging)
            this._assetSync.warn(this.getName() + ':', ...message)
    }

    error(...message) {
        if (this._assetSync._options.enableLogging)
            this._assetSync.error(this.getName() + ':', ...message)
    }

    getName() {
        return this._pluginName
    }

    async start(args = {}) {
        this._running = true
        return true
    }

    async stop(args = {}) { 
        this._running = false
        return true
    }

    getProtocols() { return [] }
}