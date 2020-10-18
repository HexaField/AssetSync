import Requester from './Requester.js'
import { simplifyObject } from '@AssetSync/common'
import { EventEmitter } from 'events'

/**  <message> {
 *      handle: ''
 *      data: {}
 *   }
 */

/**  <event> {
 *      type: ''
 *      args: [...]
 *   }
 */


/**  <request> {
 *      opcode: ''
 *      data: [...] || { }
 *   }
 */

export class PeerSync extends EventEmitter {

    constructor(sendMessage, onMessage) {
        super()

        this._handleMessage = this._handleMessage.bind(this)

        this.sendMessage = sendMessage
        this.sendMessage = this.sendMessage.bind(this)
        onMessage = this._handleMessage

        this.makeRequest = this.makeRequest.bind(this)
        this._sendRequest = this._sendRequest.bind(this)
        this._receiveRequest = this._receiveRequest.bind(this)
        this._receiveEvent = this._receiveEvent.bind(this)

        this.requester = new Requester(this._sendRequest)
        
        this._requestHandlers = {}

        this._handlers = {
            request: this._receiveRequest,
            requestReply: this._receiveReply,
            event: this._receiveEvent
        }
    }

    // API

    sendEvent(event, args) {
        this.sendMessage({ 
            handle: 'event',
            data: { event, args }
        })
    }

    async makeRequest(opcode, data) {
        if (typeof data === 'object' && !Array.isArray(data))
            data = simplifyObject(data)
        return await this.requester.request(opcode, data)
    }

    addRequestOpcode(key, value) {
        if (typeof value === 'function')
            this._requestHandlers[key] = value
    }

    addRequestOpcodes(obj) {
        for (let key of Object.keys(obj))
            if (typeof obj[key] === 'function')
                this._requestHandlers[key] = obj[key]
    }

    removeRequestOpcode(key) {
        if (this._requestHandlers[key])
            delete this._requestHandlers[key]
    }

    // internal

    async _receiveRequest(request) {

        if (this._requestHandlers[request.opcode]) {
            let response
            if (Array.isArray(request.data))
                response = await this._requestHandlers[request.opcode](...request.data)
            else
                response = await this._requestHandlers[request.opcode](request.data)
            this.sendMessage({
                handle: 'requestReply',
                data: {
                    timestamp: request.timestamp,
                    data: typeof response === 'object' ? simplifyObject(response) : response
                }
            })
        } else {
            console.log('sorry, could not parse request', request)
        }
    }

    _receiveReply(data) {
      this.requester.receiveReply(data)
    }

    _sendRequest(request) {
        this.sendMessage({ 
            handle: 'request',
            data: request
        })
    }

    _receiveEvent(event) {
        this.emit(event.type, event.args)
    }

    _handleMessage(message) {
        if (this._handlers[message.handle])
            this._handlers[message.handle](message.data)
    }
}