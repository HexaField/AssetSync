import { TransportBase } from '../transport/index.js'

export class QUICPlugin extends TransportBase {

    constructor(options = {}) {
        super(options)
        this._pluginName = 'CORE_QUICTransportPlugin'
    }
}