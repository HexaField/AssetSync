import EventEmitter from 'events'
import { NETWORKING_OPCODES } from '../Constants.js'

export default class RealmDatabase extends EventEmitter {
    constructor(realmData, assetSync, dhtProtocol) {
        super()
        this.realmData = realmData
        this.assetSync = assetSync
        this.dhtProtocol = dhtProtocol + this.realmData.id

        this.objects = {}
    }

    async start(onProgress = () => {}) {

        this.dht = await this.assetSync.dhtPlugin.addDHT(this.dhtProtocol)
        this.network = await this.assetSync.networkPlugin.joinNetwork(this.realmData.id)
        this.dht.on('put', (key, val, peer) => database.emit('put', key, val, peer))
        this.dht.on('removed', (key, val) => database.emit('removed', key, val))
        
        this.network.on('message', (message) => {
            const { opcode, content } = JSON.parse(message.data)
            this.emit(opcode, content, message.from)
        })
        
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

    sendToAll(opcode, content) {
        this.network.sendToAll(JSON.stringify({ opcode, content }))
    }

    sendTo(opcode, content, peerID) {
        this.network.sendTo(peerID, JSON.stringify({ opcode, content }))
    }

    async _get(key) {
        return await this.assetSync.dhtPlugin.get({ key, protocol: this.dhtProtocol })
    }

    async _put(key, value) {
        return await this.assetSync.dhtPlugin.put({ key, value, protocol: this.dhtProtocol })
    }

    async _getAllLocal() {
        return await this.assetSync.dhtPlugin.getAllLocal(this.dhtProtocol)
    }

    async _removeLocal(key) {
        return await this.assetSync.dhtPlugin.removeLocal({ key, protocol: this.dhtProtocol })
    }

    // === API === //

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

    // CRUDT

    // create
    async createObject({ uuid, data }) {
        console.log('createObject', uuid, data)
        try {
            await this._put(uuid, JSON.stringify(data))
            this.sendToAll(NETWORKING_OPCODES.OBJECT.CREATE, data)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    // read
    async getObjects(position, distance) {
        console.log('getObjects')
        const results = []
        results.push(...await this._getAllLocal())
        return results
    }

    // update
    async updateObject({ uuid, data }) {
        console.log('updateObject', uuid, data)
        try {
            await this._put(uuid, JSON.stringify(data))
            this.sendToAll(NETWORKING_OPCODES.OBJECT.UPDATE_PROPERTIES, data)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    // delete
    async dereferenceObject({ uuid, data }) {
        console.log('dereferenceObject', uuid, data)
        try {
            await this._removeLocal(uuid, JSON.stringify(data))
            this.sendToAll(NETWORKING_OPCODES.OBJECT.DESTROY, data)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    // transact
    async transactObject({ uuid, data }) {
        console.log('transactObject', uuid, data)
    }
}