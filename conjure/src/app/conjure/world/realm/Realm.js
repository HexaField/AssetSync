import * as THREE from 'three'
import Terrain from './Terrain'
import FeatureArtGallery from '../features/FeatureArtGallery'
import FeatureLobby from '../features/FeatureLobby'
import { REALM_TYPES, REALM_WORLD_GENERATORS, REALM_WHITELIST } from '../../../backend/realm/RealmData'
import Platform from '../Platform'
import ObjectManager from './ObjectManager'
import FeatureDiscord from '../features/FeatureDiscord'
// import FeatureParser from './FeatureParser'
import EventEmitter from 'events'
import { NETWORKING_OPCODES } from '../../../backend/Constants.js'

export default class Realm extends EventEmitter
{  
    constructor(world, realmData)
    {   
        super()
        this.world = world
        this.conjure = this.world.conjure

        this.group = new THREE.Group()
        this.world.group.add(this.group)

        this.objectLoader = new THREE.ObjectLoader();
        this.objectManager = new ObjectManager(this)

        this.realmData = realmData
        this.realmID = realmData.getID()

        this.onObjectCreate = this.onObjectCreate.bind(this)
        this.onObjectUpdate = this.onObjectUpdate.bind(this)
        this.onObjectGroup = this.onObjectGroup.bind(this)
        this.onObjectMove = this.onObjectMove.bind(this)
        this.onObjectDestroy = this.onObjectDestroy.bind(this)

        this.vec3 = new THREE.Vector3();
        this.quat = new THREE.Quaternion();

        this.features = []
        this.loading = true

        this.networkProtocolCallbacks = {}
    }

    async preload()
    {        
        if(this.realmData.getData().worldData.playsAudio) {
           await this.conjure.getAudioManager().create(true)
        }

        await this.preloadFeatures()
    }

    async preloadFeatures()
    {
        for(let feature of this.realmData.getData().worldSettings.features)
        {
            // if(typeof feature === 'object')
            // {
            //     let f = new FeatureParser(this, feature)
            //     await f.parse()
            //     await f.preload()
            //     this.features.push(f)
            //     continue
            // }
            switch(feature)
            {
                case 'Gallery': {
                    let f = new FeatureArtGallery(this)
                    await f.preload()
                    this.features.push(f)
                    break
                }

                case 'Platform': {
                    this.terrain = new Platform(this.conjure, this.world.group)
                    break
                }

                case 'Lobby': {
                    let f = new FeatureLobby(this)
                    await f.preload()
                    this.features.push(f)
                    break
                }
                
                case 'Discord': {
                    let f = new FeatureDiscord(this)
                    await f.preload()
                    this.features.push(f)
                    break
                }

                default: break
            }
        }
    }

    // intentionally noop
    sendData(opcode, content) { }

    // intentionally noop
    sendTo(opcode, content, peerID) { }

    async load()
    {
        for(let feature of this.features)
            await feature.load()

        this.database = await this.world.conjure.realms.addDatabase(this.realmData, ({ message }) => {
            this.conjure.loadingScreen.setText(message, false)
        })

        this.database.network.on('message', (message) => {
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

        this.database.network.on('onPeerJoin', (peerID) => {
            // CONSOLE.log('User ', peerID, ' has left the realm')
            this.world.sendMetadata(peerID)
            this.world.requestMetadata(peerID)
        })

        this.database.network.on('onPeerLeave', (peerID) => {
            // CONSOLE.log('User ', peerID, ' has left the realm')
            this.world.onUserLeave(peerID)
        })

        this.on(NETWORKING_OPCODES.USER.METADATA, this.world.onUserData)
        this.on(NETWORKING_OPCODES.USER.REQUEST_METADATA, (data, peerID) => { this.world.sendMetadata(peerID) })
        this.on(NETWORKING_OPCODES.USER.MOVE, this.world.onUserMove)
        this.on(NETWORKING_OPCODES.USER.ANIMATION, this.world.onUserAnimation)
        this.on(NETWORKING_OPCODES.USER.LEAVE, (data, peerID) => { this.world.onUserLeave(peerID) })

        
        this.on(NETWORKING_OPCODES.OBJECT.RECEIVE, this.onObjectCreate)
        this.on(NETWORKING_OPCODES.OBJECT.CREATE, this.onObjectCreate)
        this.on(NETWORKING_OPCODES.OBJECT.UPDATE_PROPERTIES, this.onObjectUpdate)
        this.on(NETWORKING_OPCODES.OBJECT.DESTROY, this.onObjectDestroy)
        this.on(NETWORKING_OPCODES.OBJECT.MOVE, this.onObjectMove)
        this.on(NETWORKING_OPCODES.OBJECT.GROUP, this.onObjectGroup)

        for(let obj of await this.database.getObjects()) {
            this.loadObjectFromPeer(obj.uuid, obj.data);
        }

        this.network = this.database.network
        
        this.sendData = (opcode, content) => {
            this.network.broadcast(JSON.stringify({ opcode, content }))
        }
    
        this.sendTo = (opcode, content, peerID) => {
            this.network.sendTo(peerID, JSON.stringify({ opcode, content }))
        }
    
        
        this.loading = false
    }

    async leave()
    {
        this.removeAllListeners()
        this.getObjectManager().destroyAllObjects()
        // add check to see if database should be removed (global realms etc)
        if(this.realmData.type === REALM_TYPES.EPHEMERAL)
            await this.conjure.realms.removeDatabase(this.realmData)
        
        if(this.terrain)
            this.terrain.destroy()

        for(let feature of this.features)
            await feature.unload()
        
        this.world.group.remove(this.group)
        console.log('successfully left realm')
    }
    
    getData()
    {
        return this.realmData
    }

    update(args) // { delta, input, mouseRaycaster, worldRaycaster, conjure }
    {
        for(let i of this.features)
            i.update(args)
    }

    getObjectManager()
    {
        return this.objectManager
    }
    
    onObjectCreate({ uuid, data }, peerID)
    {
        this.loadObjectFromPeer(uuid, data)
    }
    
    // update to actual object properties
    onObjectUpdate({ uuid, data }, peerID)
    {
        console.log('onObjectUpdate', { uuid, data })
    }

    // update to actual object properties
    onObjectGroup(data, peerID)
    {
        this.objectManager.groupObjects(this.objectManager.getObjectByUUID(data.newParentUUID), this.objectManager.getObjectByUUID(data.newChildUUID), true)
    }

    // update to object matrix
    onObjectMove(data, peerID)
    {
        for(let obj of data.objects)
        {
            // console.log('WORLD: onObjectMove got data', obj.data)
            this.objectManager.updateObjectFromClient(obj.uuid, obj.data);
        }
    }
    
    async onObjectDestroy(uuid, peerID)
    {
        this.objectManager.destroyObjectByHash(uuid);
    }

    // ------- //
    // OBJECTS //
    // ------- //

    async loadObjectFromPeer(uuid, data)
    {
        try {
            await this.loadObject(data)
        } catch (error) {
            console.log('REALM: could not load object', object.uuid, 'with error', error);
        }
    }

    async createObject(object)
    {
        object.userData.originatorID = this.conjure.getProfile().getID();
        object.position.copy(this.world.user.previewMeshPoint.getWorldPosition(this.vec3));
        object.quaternion.copy(this.world.user.previewMeshPoint.getWorldQuaternion(this.quat));
        object.updateMatrixWorld();
        // this.restorePhysics(object);
        let json = await this.objectToJSON(object);
        const success = await this.database.createObject({ uuid: object.uuid, data: json })
        // if adding to database failed, don't put it into our world
        if(success) {
            this.objectManager.addObject(object, true)
            this.conjure.screenManager.hideScreen()
        }
    }

    async objectToJSON(obj)
    {
        let json = obj.toJSON();
        return json
        // temp
        if(json.images)
            for(let i = 0; i < json.images.length; i++)
            {
                 // if we previously failed to get the image, we don't want to save the missing texture data
                if(json.images[i].url === this.conjure.assetManager.missingTextureData) continue

                json.images[i].hash = await this.conjure.assetManager.createAsset(ASSET_TYPE.TEXTURE, json.images[i].url, json.images[i].uuid);
                let newUUID = this.conjure.assetManager.getByIPFSHash(ASSET_TYPE.TEXTURE, json.images[i].hash).data.uuid;
                if(newUUID !== json.images[i].uuid)  // if asset already exists, replace the uuid
                {
                    if(json.textures) // replace uuid reference in texture
                        for(let j = 0; j < json.textures.length; j++)
                            if(json.textures[j].image === json.images[i].uuid)
                                json.textures[j].image = newUUID;
                    json.images[i].uuid = newUUID;
                }
                json.images[i].url = '';
            }
        return json;
    }


    async loadObject(data)
    {
        if(!data || typeof data !== 'string') return
        try
        {
            // if(data.images)
            //     for(let i = 0; i < data.images.length; i++)
            //     {
            //         if(!data.images[i].hash) continue;
            //         data.images[i].url = await this.conjure.assetManager.loadImageAssetFromHash(data.images[i].hash);
            //     }
            let object = this.loadObjectAssets(JSON.parse(data));
            // await this.conjure.assetManager.saveAssets(object)
            // console.log(object)
            // this.restorePhysics(object);
            this.objectManager.addObject(object)
            // if(data.object.userData.lastUpdate)
            //     this.objectManager.updateObjectFromClient(object.uuid, data.object.userData.lastUpdate)
            return true
        }
        catch(error)
        {
            console.log(error, data)
            return false;
        }
    }

    // TODO: this
    loadObjectAssets(json)
    {
        return this.objectLoader.parse(json);
    }

    // restorePhysics(object)
    // {
    //     if(object.userData.physics && !object.body && this.objectManager.getPhysicsType(object.userData.physics.type) >= 0)
    //     {
    //         this.conjure.physics.add.existing(object, {
    //             shape: this.objectManager.getPhysicsShape(object.userData.physics.shape),
    //             collisionFlags: this.objectManager.getPhysicsType(object.userData.physics.type),
    //             mass: object.userData.physics.mass,
    //             // breakable: object.userData.physics.destructable
    //         });
    //         object.body.setGravity(0, object.userData.physics.gravity * this.gravity, 0);
    //         object.body.setBounciness(object.userData.physics.bounciness);
    //     }
    // }

    // TODO: fix this - hashs arent handled properly
    async updateObjectPosition(obj)
    {
        await this.updateObject(obj) // temp fix

        // args to data handler need to be objectified
        const success = await this.database.updateObject(obj.userData.hash, obj.userData.lastUpdate);
        // if(!obj.userData.hash) return;
        // let json = await this.objectToJSON(obj)
        // await this.conjure.getDataHandler(SERVER_PROTOCOLS.UPDATE_OBJECT, obj.userData.hash, json);
    }

    async updateObject(obj)
    {
        if(!obj) return;
        if(!obj.uuid) 
        {
            console.log('Tried to update object without a hash! Are you sure this object is a top parent?')
            return;
        }
        let json = await this.objectToJSON(obj)
        await this.database.updateObject({ realmID: this.realmID, uuid: object.uuid, data: json });
    }

    async destroyObject(obj)
    {
        obj.userData.markedDestroyed = true;
        if(this.objectManager.getObject(obj))
        {
            let success = await this.database.dereferenceObject({ realmID: this.realmID, uuid: object.uuid })
            if(success)
            {
                this.objectManager.destroyObject(obj);
                // this.sendData(NETWORKING_OPCODES.OBJECT.DESTROY, obj.uuid, true);
            }
            else
            {
                obj.userData.markedDestroyed = false;
                console.log('failed to remove object', obj.uuid)
            }
        }
        else
        {
            let topParent = this.objectManager.getTopGroupObject(obj)
            // this.sendData(NETWORKING_OPCODES.OBJECT.UPDATE, topParent, true);
            this.objectManager.destroyObject(obj, { isChild: true });
            await this.updateObject(topParent)
        }
    }
}