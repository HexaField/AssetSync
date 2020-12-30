import EventEmitter from 'events'
import { NETWORKING_OPCODES } from '../Constants.js'
import { REALM_WORLD_GENERATORS } from './RealmData.js'
import realmBasic from './datastores/RealmDatabaseBasic.js'
import realmProcedural from './datastores/RealmDatabaseProcedural.js'
import { isNode } from '@AssetSync/common'

export default class RealmDatabase extends EventEmitter {
    constructor(realmData, assetSync, dhtProtocol) {
        super()
        this.realmData = realmData
        this.assetSync = assetSync
        this.dhtProtocol = dhtProtocol + this.realmData.id

        this.objects = {}

        this._get = async (key)  => { console.warn('ERROR! Database', realmData.id, 'has no _get implemented') }
        this._put = async (key, value)  => { console.warn('ERROR! Database', realmData.id, 'has no _put implemented') }
        this._getAllLocal = async ()  => { console.warn('ERROR! Database', realmData.id, 'has no _getAllLocal implemented') }
        this._removeLocal = async (key)  => { console.warn('ERROR! Database', realmData.id, 'has no _removeLocal implemented') }
    }

    async start(onProgress = () => {}) {

        console.log('Opening database for realm', this.realmData.id)

        this.network = await this.assetSync.networkPlugin.joinNetwork(this.realmData.id)
        
        this.network.on('message', (message) => {
            try {
                // if(typeof message.data !== 'string') return
                const { opcode, content } = JSON.parse(message.data)
                this.emit(opcode, content, message.from)
            } catch (err) {
                console.log('hmm bad message', err, message)
            }
        })
   
        this.on(NETWORKING_OPCODES.OBJECT.CREATE, (content, peerID) => {
            const { uuid, data } = content
            this._put(uuid, JSON.stringify(data))
        })
        this.on(NETWORKING_OPCODES.OBJECT.UPDATE_PROPERTIES, (content, peerID) => {
            const { uuid, data } = content
            this._put(uuid, JSON.stringify(data))
        })
        this.on(NETWORKING_OPCODES.OBJECT.DESTROY, (content, peerID) => {
            const { uuid, data } = content
            this._removeLocal(uuid, JSON.stringify(data))
        })
        this.on(NETWORKING_OPCODES.OBJECT.MOVE, (content, peerID) => {
            const { uuid, data } = JSON.parse(content)
            this._put(uuid, data)
        })
        this.on(NETWORKING_OPCODES.OBJECT.GROUP, (content, peerID) => {
            // const { uuid, data } = JSON.parse(content)
            // this._put(uuid, data)
        })
        
        // resolve at least one peer on network (so we can join the realm)
        onProgress({ message: 'Connected to network...' })

        // if(!this.realmData.global)
        //     await this.joinNetwork()

        onProgress({ message: 'Loading database' })

        // if(this.realmData.worldSettings.worldGeneratorType === REALM_WORLD_GENERATORS.INFINITE_WORLD) {
        //     await realmProcedural(this)
        // }

        if(this.realmData.worldSettings.worldGeneratorType === REALM_WORLD_GENERATORS.NONE) {
            await realmBasic(this)
        }
        
        console.log('Loaded', (await this._getAllLocal()).length, 'objects from ')
        // start physics

    }

    async stop() {
        // kill physics
    }

    sendToAll(opcode, content) {
        this.network.broadcast(JSON.stringify({ opcode, content }))
    }

    sendTo(peerID, opcode, content) {
        this.network.sendTo(peerID, JSON.stringify({ opcode, content }))
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
        // console.log('createObject', uuid, data)
        try {
            await this._put(uuid, JSON.stringify(data))
            this.sendToAll(NETWORKING_OPCODES.OBJECT.CREATE, { uuid, data })
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    // read
    async getObjects(position, distance) {
        // console.log('getObjects')
        const results = []
        results.push(...await this._getAllLocal())
        return results.map((obj) => {
            try {
                return { uuid: obj.key, data: JSON.parse(obj.value) }
            } catch (err) {
                this._removeLocal(obj.key)
                return {}
            }
        })
    }

    // update
    async updateObject({ uuid, data }) {
        // console.log('updateObject', uuid, data)
        try {
            await this._put(uuid, JSON.stringify(data))
            this.sendToAll(NETWORKING_OPCODES.OBJECT.UPDATE_PROPERTIES, { uuid, data })
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    // delete
    async dereferenceObject({ uuid, data }) {
        // console.log('dereferenceObject', uuid, data)
        try {
            await this._removeLocal(uuid)
            this.sendToAll(NETWORKING_OPCODES.OBJECT.DESTROY,  { uuid })
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    // transact
    async transactObject({ uuid, data }) {
        // console.log('transactObject', uuid, data)
    }
}