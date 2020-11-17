import { PluginBase } from '../../PluginBase.js'
import EventEmitter from 'events'
import { isNode } from '@AssetSync/common'

export class ConnectionPlugin extends PluginBase {

    constructor(options = {}) {
        super(options)
        this._pluginName = 'CORE_ConnectionPlugin'
        this._transportPlugin = options.transportPlugin
        this._peerOptions = options.peerOptions || {}

        this.connections = {}
    }

    async start(args = {}) {
        await super.start(args)
        if(isNode) {
            const { default: SimplePeer } = await import('simple-peer')
            this.SimplePeer = SimplePeer
        } else {
            this.SimplePeer = SimplePeer
        }
        return true
    }

    async stop(args = {}) {
        await super.stop(args)
        return true
    }

    async createConnection(label, initiator) {
        if(this.connections[label] && this.connections[label].connected) 
            return this.connections[label]
        const peer = new this.SimplePeer(Object.assign({}, { initiator }, this._peerOptions))
        const peerData = await new Promise((resolve) => {
            if(!initiator) {
                resolve()
            }
            peer.on('signal', (data) => {
                resolve(data)
            })
        })

        const connection = new PeerConnection({ 
            label,
            peer,
            peerData
        })

        connection.on('destroyed', () => {
            if(this.connections[label])
                delete this.connections[label]
        })

        this.connections[label] = connection

        return connection
    }

    closeConnection(label) {
        this.connections[label].disconnect()
    }

    getConnection(label) {
        return this.connections[label]
    }

    sendToAll(data) {
        for(let peer of Object.values(this.connections))
            peer.send(data)
    }

    sendToPeer(data, peer) {
        this.connections[peer].send(data)
    }
}

class PeerConnection extends EventEmitter {
    constructor({ label, peer, peerData }) {
        super()
        this.label = label
        this.peer = peer
        this.peerData = peerData
        this.initiator = peerData !== undefined
        this.connected = false

        this.peer.on('data', (data) => {
            this.emit('message', new Uint8Array(data))
        })

        this.peer.on('close', () => {
            console.log('Connection closed')
            this.emit('destroyed')
        })

        this.peer.on('error', (error) => {
            console.log('Connection error', error)
            this.emit('destroyed')
        })

        this.peer.on('connect', () => {
            this.connected = true
            this.emit('ready')
        })

        this.peer.on('signal', (data) => {
            this.peerData = data
            this.emit('signal')
        })
    }

    async signal(peerData) {
        this.peer.signal(peerData)
    }

    async disconnect() {
        if(!this.connected) return
        await new Promise((resolve) => {
            this.peer.close()
            this.peer.on('close', () => {
                console.log('Connection closed')
                resolve()
            })
            this.peer.on('error', (error) => {
                console.log('Connection error', error)
                resolve()
            })
        })
        this.connected = false
        this.emit('destroyed')
    }

    send(data) {
        if(!data || !this.connected) return
        if(data.constructor !== Uint8Array)
            throw new Error('Must send data as Uint8Array. Got instead:', typeof data)
        this.peer.send(data)
    }
}