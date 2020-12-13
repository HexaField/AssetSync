import EventEmitter from 'events'
import { NETWORKING_OPCODES } from './Constants.js'

export default class RealmDatabase extends EventEmitter {
    constructor(realmData, dhtPlugin, dhtProtocol, network) {
        super()
        this.realmData = realmData
        this.id = realmData.id
        this.dhtPlugin = dhtPlugin
        this.dhtProtocol = dhtProtocol
        this.network = network
        
        this.network.on('message', (message) => {
            const { opcode, content } = JSON.parse(message.data)
            this.emit(opcode, content, message.from)
        })

        this.on('put', (key, value, from) => {
            console.log('Received dht entry ' + key)
        })

        this.on('removed', (key, value, from) => {
            console.log('Removed dht entry ' + key)
        })
    }

    sendToAll(opcode, content) {
        this.network.sendToAll(JSON.stringify({ opcode, content }))
    }

    sendTo(opcode, content, peerID) {
        this.network.sendTo(peerID, JSON.stringify({ opcode, content }))
    }

    async get(key) {
        return await this.dhtPlugin.get({ key, protocol: this.dhtProtocol })
    }

    async put(key, value) {
        return await this.dhtPlugin.put({ key, value, protocol: this.dhtProtocol })
    }

    async getAllLocal() {
        return await this.dhtPlugin.getAllLocal(this.dhtProtocol)
    }

    async removeLocal(key) {
        return await this.dhtPlugin.removeLocal({ key, protocol: this.dhtProtocol })
    }

    async start(onProgress = () => {}) {

        // resolve at least one peer on network (so we can join the realm)
        console.log('Loading database...')
        onProgress({ message: 'Loading database...' })
        if(!this.realmData.global)
            await this.joinNetwork()

        console.log('Joined network...')
        onProgress({ message: 'Joined network' })
        // get all objects
        // start physics

    }

    async stop() {
        // kill physics
    }

    async joinNetwork() {
        // in case we resolve a peer really quickly
        if(!this.network.getPeers().length) {
            await new Promise((resolve) => {
                this.network.on('onPeerJoin', () => {
                    resolve()
                })
            })
        }
    }

    // all objects in ROI
    async getAllObjects() {
        
    }

    /**
     * TODO
     * query all objects within a circle of a position
     */
    async queryRange(position, distance) {
        console.log('queryRange')
        const results = []
        results.push(...await this.getAllLocal())
        return results
    }

    async createObject({ uuid, data }) {
        console.log('createObject', uuid, data)
        try {
            await this.put(uuid, JSON.stringify(data))
            this.sendToAll(NETWORKING_OPCODES.OBJECT.CREATE, data)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async updateObject({ uuid, data }) {
        console.log('updateObject', uuid, data)
        try {
            await this.put(uuid, JSON.stringify(data))
            this.sendToAll(NETWORKING_OPCODES.OBJECT.UPDATE_PROPERTIES, data)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async dereferenceObject({ uuid, data }) {
        console.log('dereferenceObject', uuid, data)
        try {
            await this.removeLocal(uuid, JSON.stringify(data))
            this.sendToAll(NETWORKING_OPCODES.OBJECT.DESTROY, data)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async transactObject({ uuid, data }) {
        console.log('transactObject', uuid, data)
    }
}