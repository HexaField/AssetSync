import * as THREE from 'three'
import Terrain from './Terrain'
import FeatureArtGallery from '../features/FeatureArtGallery'
import FeatureLobby from '../features/FeatureLobby'
import { REALM_TYPES, REALM_WORLD_GENERATORS, REALM_WHITELIST } from '../../../backend/realm/RealmData'
import Platform from '../Platform'
import FeatureDiscord from '../features/FeatureDiscord'
// import FeatureParser from './FeatureParser'
import EventEmitter from 'events'
import { NETWORKING_OPCODES } from '../../../backend/Constants.js'
import { getParams } from '@AssetSync/common'

export default class Realm extends EventEmitter {
    constructor(world, realmData) {
        super()
        this.world = world
        this.conjure = this.world.conjure

        this.group = new THREE.Group()
        this.world.group.add(this.group)

        this.objectLoader = new THREE.ObjectLoader();

        this.realmData = realmData
        this.realmID = realmData.getID()

        this.vec3 = new THREE.Vector3();
        this.quat = new THREE.Quaternion();

        this.features = []
        this.loading = true

        this.networkProtocolCallbacks = {}
    }

    // intentionally noop
    sendData(opcode, content) { }

    // intentionally noop
    sendTo(opcode, content, peerID) { }

    async load() {
        if (this.realmData.getData().worldData.playsAudio) {
            await this.conjure.getAudioManager().create(true)
        }

        this.database = await this.world.conjure.realms.addDatabase(this.realmData, (...message) => {
            this.conjure.loadingScreen.setText(...message, false)
            console.log('Loading Realm:', ...message)
        }, getParams().network === 'true') // this is a security & coherency problem and will be removed when the network goes live
        this.conjure.physics = this.database.world.physics
        this.world.group.add(this.database.world.scene)

        this.database.eventHooks.on('message', (message) => {
            // console.log(message)
            try {
                const { opcode, content } = JSON.parse(message.data)
                this.emit(opcode, content, message.from)
            } catch (err) {
                // const { opcode, content } = this.conjure.networkingSchemas.decode(message.data)
                // console.log(opcode, content)
                // this.realm.emit(opcode, content, message.from)
                console.log('hmm bad message', err, message)
            }
        })

        this.database.eventHooks.on('onPeerJoin', (peerID) => {
            // CONSOLE.log('User ', peerID, ' has left the realm')
            this.world.sendMetadata(peerID)
            this.world.requestMetadata(peerID)
        })

        this.database.eventHooks.on('onPeerLeave', (peerID) => {
            // CONSOLE.log('User ', peerID, ' has left the realm')
            this.world.onUserLeave(peerID)
        })

        this.on(NETWORKING_OPCODES.USER.METADATA, this.world.onUserData)
        this.on(NETWORKING_OPCODES.USER.REQUEST_METADATA, (data, peerID) => { this.world.sendMetadata(peerID) })
        this.on(NETWORKING_OPCODES.USER.MOVE, this.world.onUserMove)
        this.on(NETWORKING_OPCODES.USER.ANIMATION, this.world.onUserAnimation)
        this.on(NETWORKING_OPCODES.USER.LEAVE, (data, peerID) => { this.world.onUserLeave(peerID) })


        this.database.onObjectCreate = (object, peerID) => {
            this.loadObject(object)
        }
    
        // update to actual object properties
        this.database.onObjectUpdate = (object, peerID) => {
            console.log('onObjectUpdate', object)
        }
    
        // update to actual object properties
        this.database.onObjectGroup = (data, peerID) => {
            // this.objectManager.groupObjects(this.objectManager.getObjectByUUID(data.newParentUUID), this.objectManager.getObjectByUUID(data.newChildUUID), true)
        }
    
        // update to object matrix
        this.database.onObjectMove = (data, peerID) => {
            for (let obj of data.objects) {
                // console.log('WORLD: onObjectMove got data', obj.data)
                // this.objectManager.updateObjectFromClient(obj.uuid, obj.data);
            }
        }
    
        this.database.onObjectDestroy = async (object, peerID) => {
            this.world.objectControls.detach(object)
        }

        // for (let obj of await this.database.getObjects()) {
        //     this.loadObject(obj);
        // }

        this.network = this.database.network

        this.sendData = (opcode, content) => {
            this.network.broadcast(JSON.stringify({ opcode, content }))
        }

        this.sendTo = (opcode, content, peerID) => {
            this.network.sendTo(peerID, JSON.stringify({ opcode, content }))
        }

        await this.loadFeatures()

        this.loading = false
    }

    async loadFeatures() {
        for (let feature of this.realmData.getData().worldSettings.features) {
            // if(typeof feature === 'object')
            // {
            //     let f = new FeatureParser(this, feature)
            //     await f.parse()
            //     await f.preload()
            //     this.features.push(f)
            //     continue
            // }
            switch (feature) {
                case 'Gallery': {
                    let f = new FeatureArtGallery(this)
                    await f.load()
                    this.features.push(f)
                    break
                }

                case 'Platform': {
                    this.terrain = new Platform(this.conjure, this.world.group)
                    break
                }

                case 'Lobby': {
                    let f = new FeatureLobby(this)
                    await f.load()
                    this.features.push(f)
                    break
                }

                case 'Discord': {
                    let f = new FeatureDiscord(this)
                    await f.load()
                    this.features.push(f)
                    break
                }

                default: break
            }
        }
    }

    async leave() {
        this.world.group.remove(this.database.world.scene)
        this.database.eventHooks.removeAllListeners()
        this.removeAllListeners()
        // add check to see if database should be removed (global realms etc)
        if (this.realmData.type === REALM_TYPES.EPHEMERAL)
            await this.conjure.realms.removeDatabase(this.realmData)

        if (this.terrain)
            this.terrain.destroy()

        for (let feature of this.features)
            await feature.unload()

        this.conjure.physics = undefined
        this.world.group.remove(this.group)
        console.log('successfully left realm')
    }

    getData() {
        return this.realmData
    }

    update(updateArgs) // { delta, input, mouseRaycaster, worldRaycaster, conjure }
    {
        for (let i of this.features)
            i.update(updateArgs)
    }
    
    async createObject(object) {
        object.userData.originatorID = this.conjure.assetSync.peerID
        object.updateMatrixWorld()
        await this.database.createObject(object)
    }

    async destroyObject(object) {
        this.world.objectControls.detachAll(object)
    }
}