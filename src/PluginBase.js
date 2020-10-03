import EventEmitter from "events"
const clone = require('lodash.clonedeep')

const DEFAULT_OPTIONS = {
    enableLogging: true
}

export class PluginBase extends EventEmitter {

    constructor(options = {}) {
        super()

        this._pluginName = 'Unnamed Plugin - ' + Date.now()
        this._running = false
        this._options = Object.assign({}, clone(DEFAULT_OPTIONS), clone(options))
    }

    setAssetSync(assetSync) {
        this._assetSync = assetSync
    }

    async register(args = {}) { }

    log(...message) {
        if (this._options.enableLogging)
            console.log(new Date().toTimeString().substring(0, 8) + ": " + this.getName() + ":", ...message)
    }

    warn(...message) {
        if (this._options.enableLogging)
            console.warn(new Date().toTimeString().substring(0, 8) + ": " + this.getName() + ":", ...message)
    }

    getName() {
        return this._pluginName
    }

    async start(args = {}) {
        this._running = true
        return true
    }

    async loseSlave(args = {}) { 

    }

    async stop(args = {}) { 
        this._running = false
        return true
    }

}