import { PluginBase } from '../../PluginBase.js'
import Peer from 'simple-peer'
import EventEmitter from 'events'

export class ConnectionPlugin extends PluginBase {

    constructor(options = {}) {
        super(options)
        this._pluginName = 'CORE_ConnectionPlugin'
        this._transportPlugin = options.transportPlugin
        this._peerOptions = options.peerOptions

        this.connections = {}
    }

    async start(args = {}) {
        await super.start(args)
        return true
    }

    async stop(args = {}) {
        await super.stop(args)
        return true
    }

    async createConnection(label, initiator) {
        const peer = new Peer(Object.assign({}, { initiator }, this._peerOptions))
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
    }

    async signal(peerData) {
        await new Promise((resolve) => {
            this.peer.signal(peerData)
            this.peer.on('signal', (data) => {
                this.peerData = data
                resolve()
            })
        })
    }

    async connect(peerData) {
        return await new Promise((resolve, reject) => {
            if(!this.peerData) {
                reject('Error! No signal yet!')
            }
            this.peer.signal(peerData)
            this.peer.on('connect', () => {
                resolve(true)
            })
            this.peer.on('data', (data) => {
                this.emit('message', new Uint8Array(data))
            })
            this.peer.on('close', () => {
                console.log('Connection closed')
                this.emit('destroyed')
                resolve()
            })
            this.peer.on('error', () => {
                console.log('Connection error')
                this.emit('destroyed')
                resolve()
            })
        })
    }

    async disconnect() {
        await new Promise((resolve) => {
            this.peer.close()
            this.peer.on('close', () => {
                console.log('Connection closed')
                resolve()
            })
            this.peer.on('error', () => {
                console.log('Connection error')
                resolve()
            })
        })
        this.emit('destroyed')
    }

    send(data) {
        if(data.constructor !== Uint8Array)
            throw new Error('Must send data as Uint8Array. Got instead:', typeof data)
        this.peer.send(data)
    }
}