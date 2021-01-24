import EventEmitter from 'events'
import { NETWORKING_OPCODES } from '../Constants.js'
import { REALM_WORLD_GENERATORS } from './RealmData.js'
import realmBasic from './datastores/RealmDatabaseBasic.js'
import realmProcedural from './datastores/RealmDatabaseProcedural.js'
import { isNode } from '@AssetSync/common'
import RealmWorld from './RealmWorld.js'

const oneFrame = 1000 / 60
const updateQueueSendPeriod = oneFrame // send object changes every 1 frame
const savePeriod = 5 * 1000 // every 5 seconds save any changes made to an object to disk
const saveAllPeriod = 5 * 60 * 1000 // every 5 minutes save all objects to disk

export default class RealmDatabase extends EventEmitter {
    constructor(realmHandler, realmData, dhtProtocol) {
        super()
        this.eventHooks = new EventEmitter()
        this.realmHandler = realmHandler
        this.assetSync = realmHandler.assetSync
        this.realmData = realmData
        this.dhtProtocol = dhtProtocol + this.realmData.id

        this.isInitialised = false
        
        this.objects = {}
        this.updateQueue = {}
        this.objectsToSave = []

        this.updatePeers = this.updatePeers.bind(this)
        this.saveUpdates = this.saveUpdates.bind(this)
        this.saveAll = this.saveAll.bind(this)

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
        const timer = Date.now()
        onProgress('Opening database for realm', this.realmData.id)
        this.network = await this.assetSync.networkPlugin.joinNetwork(this.realmData.id)
        this.world = new RealmWorld(this)

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
        this.on(NETWORKING_OPCODES.OBJECT.UPDATE, async (content, peerID) => {
            for(let { uuid, params } of content) {
                for(let { param, value} of params) {
                    this.world.updateObject(uuid, param, value)
                }
            }
            // await this._put(uuid, JSON.stringify(data))
            // this.physics && this.physics.updateObject(object) // TODO
            // this.onObjectUpdate(uuid, data, peerID) // TODO
        })
        this.on(NETWORKING_OPCODES.OBJECT.DESTROY, async (content, peerID) => {
            const { uuid, data } = content
            await this._put(uuid, '')
            const object = this.world.getObject(uuid)
            this.world.removeObject(object)
            this.onObjectDestroy(object, peerID)
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

        await this.world.initialise(onProgress, forceSync)

        this.queueInterval = setInterval(this.updatePeers, updateQueueSendPeriod)
        this.saveInterval = setInterval(this.saveUpdates, savePeriod)
        this.saveAllInterval = setInterval(this.saveAll, saveAllPeriod)

        this.isInitialised = true

        onProgress('Finished syncing database for realm', this.realmData.id, 'in', Date.now() - timer, 'ms')
    }

    async stop() {
        // kill physics
        clearInterval(this.queueInterval)
        clearInterval(this.saveAllInterval)
        clearInterval(this.saveInterval)
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

    updatePeers() {
        const uuids = Object.keys(this.updateQueue)
        if(!uuids.length) return
        const updates = []
        for(let uuid of uuids) {
            const update = []
            const object = this.world.getObject(uuid)
            if(!object) continue
            for(let param of this.updateQueue[uuid]) {
                if(object[param])
                    update.push({ param, value: object[param] })
            }
            updates.push({ uuid, params: update })
        }
        this.updateQueue = {}
        this.sendToAll(NETWORKING_OPCODES.OBJECT.UPDATE, updates)
    }

    async saveUpdates() {
        if(this.objectsToSave.length) {
            for(let object of this.objectsToSave) {
                delete object.userData.needsSaving
                const entry = object.toJSON()
                await this._put(object.uuid, JSON.stringify(entry))
            }
            this.objectsToSave = []
            console.log('Realm ' + this.realmData.id + ' updates successfully saved.')
        }
    }

    async saveAll() {
        for(let object of this.world.getAllObjects()) {
            if(object.body || object.userData.needsSaving) {
                delete object.userData.needsSaving
                const entry = object.toJSON()
                await this._put(object.uuid, JSON.stringify(entry))
            }
        }
        console.log('Realm ' + this.realmData.id + ' successfully saved.')
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
        if(this.isInitialised) {
            return this.world.getAllObjects()
        }
        const results = []
        results.push(...await this._getAllLocal())
        return results.map((obj) => {
            try {
                if(obj.value === '') 
                    return
                return this.realmHandler.objectLoader.parse(JSON.parse(obj.value))
            } catch (err) {
                console.log(err)
                // this._removeLocal(obj.key)
                return
            }
        }).filter((obj) => {
            return obj !== undefined
        })
    }

    // update
    /**
     * @param {string || THREE.Object3D} object
     * @param {string || [string]} paramKey
     * @returns {Promise<boolean>}
     */
    async updateObject(object, paramKey) {
        // console.log('updateObject', paramKey, object[paramKey])
        paramKey = Array.isArray(paramKey) ? paramKey : [paramKey]
        try {
            const uuid = typeof object === 'object' ? object.uuid : object
            if(!this.updateQueue[uuid]) {
                this.updateQueue[uuid] = []
            }
            this.updateQueue[uuid].push([...paramKey])
            if(!this.objectsToSave.includes(object)) {
                this.objectsToSave.push(object)
            }
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    // delete
    /**
     * @param {string || THREE.Object3D} object
     * @returns {Promise<boolean>}
     */
    async removeObject(object) {
        try {
            const uuid = typeof object === 'object' ? object.uuid : object
            // const entry = object.toJSON()
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