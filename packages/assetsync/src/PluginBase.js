import EventEmitter from "events"
import clone from "lodash.clonedeep"

const BASE_OPTIONS = {
    enableLogging: true
}

export class PluginBase extends EventEmitter {

    constructor(options = {}) {
        super()

        this._pluginName = 'Unnamed Plugin - ' + Date.now()
        this._running = false
        this._options = Object.assign({}, BASE_OPTIONS, options)
    }

    register(assetSync) {
        this._assetSync = assetSync
    }

    log(...message) {
        if (this._options.enableLogging)
            console.log(new Date().toTimeString().substring(0, 8) + ": " + this.getName() + ":", ...message)
    }

    warn(...message) {
        if (this._options.enableLogging)
            console.warn(new Date().toTimeString().substring(0, 8) + ": " + this.getName() + ":", ...message)
    }

    error(...message) {
        console.error(new Date().toTimeString().substring(0, 8) + ": " + this.getName() + ":", ...message)
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