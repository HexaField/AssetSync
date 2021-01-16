import EventEmitter from 'events'
import { NETWORKING_OPCODES } from '../Constants.js'
import { REALM_WORLD_GENERATORS } from './RealmData.js'
import realmBasic from './datastores/RealmDatabaseBasic.js'
import realmProcedural from './datastores/RealmDatabaseProcedural.js'
import { isNode } from '@AssetSync/common'
import RealmWorld from './RealmWorld.js'

export default class RealmDatabase extends EventEmitter {
    constructor(realmHandler, realmData, dhtProtocol) {
        super()
        this.eventHooks = new EventEmitter()
        this.realmHandler = realmHandler
        this.assetSync = realmHandler.assetSync
        this.realmData = realmData
        this.dhtProtocol = dhtProtocol + this.realmData.id
        
        this.objects = {}

        this._stopDatastores = async ()  => { console.warn('ERROR! Database', realmData.id, 'has no _stopDatastores implemented') }
        this._get = async (key)  => { console.warn('ERROR! Database', realmData.id, 'has no _get implemented') }
        this._put = async (key, value)  => { console.warn('ERROR! Database', realmData.id, 'has no _put implemented') }
        this._getAllLocal = async ()  => { console.warn('ERROR! Database', realmData.id, 'has no _getAllLocal implemented') }
        this._removeLocal = async (key)  => { console.warn('ERROR! Database', realmData.id, 'has no _removeLocal implemented') }

        this.onObjectCreate = (object, peerID) => {}
        this.onObjectUpdate = (object, peerID) => {}
        this.onObjectGroup = (data, peerID) => {}
        this.onObjectMove = (data, peerID) => {}
        this.onObjectDestroy = (object, peerID) => {}
    }

    async start(onProgress = () => {}, forceSync) {
        onProgress('Opening database for realm', this.realmData.id)
        this.network = await this.assetSync.networkPlugin.joinNetwork(this.realmData.id)

        // if(this.realmData.worldSettings.worldGeneratorType === REALM_WORLD_GENERATORS.INFINITE_WORLD) {
        //     await realmProcedural(this)
        // }
        
        // start physics
        this.network.on('message', (message) => {
            this.eventHooks.emit('message', message)
            try {
                // if(typeof message.data !== 'string') return
                const { opcode, content } = JSON.parse(message.data)
                this.emit(opcode, content, message.from)
            } catch (err) {
                console.log('hmm bad message', err, message)
            }
        })
        this.network.on('onPeerJoin', (peerID) => { this.eventHooks.emit('onPeerJoin', peerID) })
        this.network.on('onPeerLeave', (peerID) => { this.eventHooks.emit('onPeerLeave', peerID) })
   
        this.on(NETWORKING_OPCODES.OBJECT.CREATE, async (content, peerID) => {
            const { uuid, data } = content
            await this._put(uuid, JSON.stringify(data))
            const object = this.realmHandler.objectLoader.parse(data)
            this.world.loadObject(object)
            this.onObjectCreate(object, peerID)
        })
        this.on(NETWORKING_OPCODES.OBJECT.UPDATE_PROPERTIES, async (content, peerID) => {
            const { uuid, data } = content
            await this._put(uuid, JSON.stringify(data))
            // this.physics && this.physics.updateObject(object) // TODO
            // this.onObjectUpdate(uuid, data, peerID) // TODO
        })
        this.on(NETWORKING_OPCODES.OBJECT.DESTROY, async (content, peerID) => {
            const { uuid, data } = content
            // await this._removeLocal(uuid, JSON.stringify(data))
            await this._put(uuid, '')
            this.onObjectDestroy(this.world.getObject(uuid), peerID)
        })
        this.on(NETWORKING_OPCODES.OBJECT.MOVE, async (content, peerID) => {
            const { uuid, data } = JSON.parse(content)
            await this._put(uuid, data)
            // this.onObjectMove(uuid, data, peerID)
        })
        this.on(NETWORKING_OPCODES.OBJECT.GROUP, async (content, peerID) => {
            // const { uuid, data } = JSON.parse(content)
            // await this._put(uuid, data)
            // this.onObjectGroup(data, peerID)
        })

        if(this.realmData.worldSettings.worldGeneratorType === REALM_WORLD_GENERATORS.NONE) {
            await realmBasic(this, onProgress, forceSync)
        }

        this.world = new RealmWorld(this)
        await this.world.initialise(onProgress)
    }

    async stop() {
        // kill physics
        this.eventHooks.removeAllListeners()
        await this.network.leave()
        await this._stopDatastores()
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
    /**
     * @param {THREE.Object3D} object
     * @returns {Promise<boolean>}
     */
    async createObject(object) {
        // console.log('createObject', uuid, data)
        try {
            const uuid = object.uuid
            const entry = object.toJSON()
            await this._put(uuid, JSON.stringify(entry))
            this.world.loadObject(object)
            this.sendToAll(NETWORKING_OPCODES.OBJECT.CREATE, { uuid, data: entry })
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    // read
    /**
     * @returns {Promise<[THREE.Object3D]>}
     */
    async getObjects() {
        // console.log('getObjects')
        const results = []
        results.push(...await this._getAllLocal())
        return results.map((obj) => {
            try {
                return this.realmHandler.objectLoader.parse(JSON.parse(obj.value))
            } catch (err) {
                // this._removeLocal(obj.key)
                return
            }
        }).filter((obj) => {
            return obj !== undefined
        })
    }

    // update
    /**
     * @param {THREE.Object3D} object
     * @returns {Promise<boolean>}
     */
    async updateObject(object) {
        // console.log('updateObject', uuid, data)
        try {
            const uuid = object.uuid
            const entry = object.toJSON()
            await this._put(uuid, JSON.stringify(entry))
            this.world.updateObject(object)
            this.sendToAll(NETWORKING_OPCODES.OBJECT.UPDATE_PROPERTIES, { uuid, data: entry })
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    // delete
    /**
     * @param {THREE.Object3D} object
     * @returns {Promise<boolean>}
     */
    async removeObject(object) {
        // console.log('dereferenceObject', uuid, data)
        try {
            const uuid = object.uuid
            const entry = object.toJSON()
            await this._put(uuid, '')
            this.world.removeObject(object)
            this.sendToAll(NETWORKING_OPCODES.OBJECT.DESTROY, { uuid })
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