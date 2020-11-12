import { PluginBase } from '../../PluginBase.js'
import Peer from 'https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js'
import { generateUUID } from '@AssetSync/common'

export class ConnectionPlugin extends PluginBase {

    constructor(options = {}) {
        super(options)
        this._pluginName = 'CORE_ConnectionPlugin'
        this._transportPlugin = options.transportPlugin

        this.peer = new Peer()
        this.peerID = this.peer.id

        this.connections = {}
    }

    async start(args = {}) {
        await super.start(args)
        
        return true
    }

    // TODO this needs to be fixed
    async stop(args = {}) {
        await super.stop(args)

        return true
    }

    async connect(id) {
        
        const uuid = generateUUID()

        await new Promise((resolve) => {
            const conn = this.peer.connect('another-peers-id', { label: uuid })
            conn.on('open', () => {
                resolve()
            })
            conn.on('data', (data) => {
                // Will print 'hi!'
                this.emit('message', uuid, data)
            })
            conn.on('close', () => {
                this.emit('close')
            })
            conn.on('error', () => {
                this.emit('close')
            })
        })
        
        this.connections[uuid] = conn

        return uuid
    }

    async disconnect(peerName) {
        await new Promise((resolve) => {
            this.connections[peerName].close()
            this.connections[peerName].on('close', () => {
                resolve()
            })
            this.connections[peerName].on('error', () => {
                resolve()
            })
        })
        delete this.connections[peerName]
    }

    getConnection(peerName) {
        return this.connections[peerName]
    }

    sendMessage(peerName, data) {
        if(this.connections[peerName])
            this.connections[peerName].send(data)
    }

    broadcastMessage(data) {
        for(let peer of Object.values(this.connections))
            peer.send(data)
    }
}