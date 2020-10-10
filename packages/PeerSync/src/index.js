import WebSocketClient from './WebSocketClient.js'
import WebSocketServer from './WebSocketServer.js'
import { isBrowser } from '@AssetSync/common'
import clone from 'lodash.clonedeep'
import { EventEmitter } from 'events'

export default class PeerSync extends EventEmitter {

    constructor() {
        super()
        this._protocolFunctions = {}
        this._callbacks = {}
        this._isSlave = false // if browser is connected to node
    }

    // INITIALISE

    async initialise() {

        // set up web sockets
        if (isBrowser) {

            await new Promise((resolve, reject) => {

                this.receiveWebsocketData = this.receiveWebsocketData.bind(this)

                this._websocket = new WebSocketClient()

                this._websocket.on('connect', () => {

                    console.log('Data Module: Successfully connected to local node!')
                    this._isSlave = true
                    resolve()
                })

                this._websocket.on('disconnect', async (error) => {

                    // Still need to figure out what to do here

                    this._isSlave = false
                    resolve()
                })

                this._websocket.on('message', this.receiveWebsocketData)
            })
        } else {

            this.parseWebsocketData = this.parseWebsocketData.bind(this)
            this._websocket = new WebSocketServer()
            this._websocket.on('message', this.parseWebsocketData)
            this._websocket.on('disconnect', (error) => {
                console.log('Lost connection with client' + (error ? ' with error ' + error : ''))
                this.loseSlave()
            })
        }
        this.emit(this._isSlave ? 'startSlave' : 'startMaster')
    }

    // =========== //

    addProtocolFunction(args = {}) {
        if (!args.protocol) return

        this._protocolFunctions[args.protocol] = {
            callbacks: args.callbacks,
            handler: args.handler
        }
    }

    async callProtocolFunction(protocol, data) {
        if (!this._protocolFunctions[protocol]) return

        if (this._protocolFunctions[protocol].callbacks) {
            if (!this._callbacks[protocol])
                this._callbacks[protocol] = {}

            const callbackData = this._protocolFunctions[protocol].callbacks(data)
            this._callbacks[protocol][callbackData.id] = callbackData.funcs
        }

        if (this._isSlave)
            return await this.awaitMasterResponse(protocol, data) // calls the handler on the node server
        else
            return await this._protocolFunctions[protocol].handler(data)
    }

    async awaitMasterResponse(protocol, data) {
        if (!data) data = ''
        return await new Promise((resolve, reject) => {

            // create timestamp that acts as an identifier for the request
            const requestTimestamp = protocol + '-' + Date.now() + '-' + Math.round(Math.random() * 1000)

            // create callback to listen for node server responses
            this._websocket.addListener(requestTimestamp, (_returnedData) => {

                _returnedData === undefined
                    ? reject('Data Module: WebSocket request timed out')
                    : resolve(_returnedData.data)
            })

            // send a request to node server
            this._websocket.sendData({ protocol: protocol, requestTimestamp: requestTimestamp, data: data })
        })
    }

    // ===  only on the client - receiving from the server === //

    // data = { data, protocol, id, event }

    receiveWebsocketData(data) {
        if (data.protocol && this._callbacks[data.protocol] && this._callbacks[data.protocol][data.id])
            this._callbacks[data.protocol][data.id][data.event](...data.data)
    }

    // ===  only on the server - receiving from the client === //

    // data = { protocol, requestTimestamp, data }

    async parseWebsocketData(data) {

        const protocol = this._protocolFunctions[data.protocol]
        if (!protocol) return

        const funcs = {}

        if (protocol.callbacks) {
            const callbackData = protocol.callbacks(data.data)
            Object.keys(callbackData.funcs).forEach((func) => {
                funcs[func] = (..._data) => this._websocket.sendData({ data: [..._data], protocol: data.protocol, id: callbackData.id, event: func })
            })
        }

        const args = Object.assign({}, clone(data.data), clone(funcs))

        this._websocket.sendData({
            data: await protocol.handler(args),
            requestTimestamp: data.requestTimestamp
        })
    }

    /*   EXAMPLE PROTOCOL FUNCTION WITH CALLBACKS (from old assetsync)

    this._assetSync.addProtocolFunction({
        protocol: ASSETSYNC_PLUGIN_PROTOCOLS_NETWORK.NETWORK_JOIN,
        callbacks: (data) => {
            return {
                id: data.network,
                funcs: {
                    onMessage: data.onMessage,
                    onPeerJoin: data.onPeerJoin,
                    onPeerLeave: data.onPeerLeave,
                }
            }
        },
        handler: async (data) => {
            return Boolean(await this.joinNetwork(data.network, data.onMessage, data.onPeerJoin, data.onPeerLeave))
                ? 'Successfully joined network ' + data.network
                : 'ERROR: failed to join network' + data.network
        }
    })

    */

}