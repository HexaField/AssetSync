import * as THREE from 'three'
import { NETWORKING_OPCODES } from './realm/NetworkingSchemas'
import Realm, { GLOBAL_REALMS } from './realm/Realm.js'
import User from '../user/User.js'
import UserRemote from '../user/UserRemote.js'
import { CONJURE_MODE } from '../Conjure.js'
import { INTERACT_TYPES } from '../screens/hud/HUDInteract.js'
import RealmData, { REALM_WORLD_GENERATORS, REALM_WHITELIST } from './realm/RealmData.js'
import _ from 'lodash'

export default class World
{
    constructor(conjure)
    {
        this.conjure = conjure
        this.scene = this.conjure.scene

        this.realmHandler = conjure.realms

        this.group = new THREE.Group()
        this.scene.add(this.group)

        this.user = new User(conjure);
        this.remoteUsers = {};

        this.lastUserUpdate = {};

        this.savePeriod = 5; // save every 5 seconds
        this.updatesPerSecond = 60; // update peers every 1/xth of a second 
        this.updateCount = 0;
        this.updateCountMax = 60 / this.updatesPerSecond;

        this.interactMaxDistance = 4
        
        this.deltaThreshold = 0.1;

        this.vec3 = new THREE.Vector3();
        this.quat = new THREE.Quaternion();

        this.globalRealms = []
        this.spawnLocation = new THREE.Vector3(0, 2, 0)
        this.lastRealmID = 'Lobby'

        this.onUserJoin = this.onUserJoin.bind(this)
        this.onUserLeave = this.onUserLeave.bind(this)
        this.onUserUpdate = this.onUserUpdate.bind(this)
        this.onUserMove = this.onUserMove.bind(this)
        this.onUserAnimation = this.onUserAnimation.bind(this)
    }

    async loadDefault()
    {
        if(this.conjure.urlParams.r)
        {
            if(await this.joinRealmByID(this.conjure.urlParams.r))
                return
        }
        else
        {
            if(await this.joinRealmByID(await self.simpleStorage.get('conjure-profile-lastJoinedRealm')))
                return

        }
        await this.joinRealmByID('Lobby')
    }

    async getRealms()
    {
        let realms = {}
        
        for(let realm of await this.conjure.getProfile().getServiceManager().getRealmsFromConnectedServices())
            realms[realm.id] = new RealmData(realm).getData()

        for(let realm of await this.conjure.realms.getRealms())  
            realms[realm.id] = new RealmData(realm).getData()

        for(let realm of this.globalRealms)
        {
            realms[realm.id] = realm
        }
        
        return Object.values(realms)
    }

    async getRealmsAndPinned()
    {
        let realms = {}
        
        for(let realm of await this.conjure.getProfile().getServiceManager().getRealmsFromConnectedServices())
            realms[realm.id] = { realmData: new RealmData(realm).getData(), pinned: false }
        
        for(let pinned of await this.conjure.realms.getRealms())
        {
            if(realms[pinned.id])
                realms[pinned.id].pinned = true
            else
                realms[pinned.id] = { realmData: new RealmData(pinned).getData(), pinned: true }
        }

        for(let realm of this.globalRealms)   
            realms[realm.id] = { realmData: realm, pinned: 'global' }
        
        return Object.values(realms)
    }

    async getRealm(id, getPrivate)
    {
        for(let realm of this.globalRealms)
            if(id === realm.id)
                return realm
        
        return await this.conjure.realms.getRealm(id)
    }

    async preloadGlobalRealms()
    {
        for(let realm of Object.values(GLOBAL_REALMS))
        {
            const realmData = new RealmData(realm).getData()
            realmData.global = true
            this.globalRealms.push(realmData)
            await this.conjure.realms.pinRealm(realmData, true)
        }
    }

    async joinRealm(realmData, args = {})
    {
        if(!args.force && this.realm && realmData.getID() === this.realm.realmID) return false
        if(this.realm)
        {
            this.lastRealmID = this.realm.realmID
            await this.realm.leave()
            this.destroyAllRemoteUsers()
            this.realm = undefined
        }

        // console.log('Joining realm', realmData)
        this.conjure.setConjureMode(CONJURE_MODE.LOADING)

        if(realmData.getData().whitelist)
        {
            if(realmData.getData().whitelist.type === REALM_WHITELIST.SERVICE)
            {
                if(!this.conjure.getProfile().getServiceManager().getServiceLinked('Discord')) return false
                // if(!realmData.getData().whitelist.ids.includes(this.conjure.getProfile().getServiceManager().getService('Discord').data.discordID)) return false
            }
            if(realmData.getData().whitelist.type === REALM_WHITELIST.PASSCODE)
            {
                this.conjure.setConjureMode(CONJURE_MODE.LOADING)
                this.conjure.loadingScreen.setPasscodeVisible(true)
                console.log('Waiting for valid passcode...')
                if(!await this.waitForPasscode(realmData.getData().whitelist.ids))
                {
                    console.log('Maybe another time...')
                    return false
                }
                console.log('Passcode successful!')
                this.conjure.loadingScreen.setPasscodeVisible(false)
                this.conjure.loadingScreen.setText('Passcode successful!')
            }
        }

        // ----------- //

        this.realm = new Realm(this, realmData)
        await self.simpleStorage.set('conjure-profile-lastJoinedRealm', realmData.getID()) // make a thing for this
        
        await this.realm.preload()
        await this.realm.load()

        this.realm.on(NETWORKING_OPCODES.USER.JOIN, this.onUserJoin)
        this.realm.on(NETWORKING_OPCODES.USER.LEAVE, this.onUserLeave)
        // this.realm.on(NETWORKING_OPCODES.USER.UPDATE, this.onUserUpdate)
        this.realm.on(NETWORKING_OPCODES.USER.MOVE, this.onUserMove)
        // this.realm.on(NETWORKING_OPCODES.USER.ANIMATION, this.onUserAnimation)

        let spawn = realmData.getData().worldData.spawnPosition || new THREE.Vector3(0, 1, 0)
        this.spawnLocation = spawn
        this.user.teleport(spawn.x, spawn.y, spawn.z)
        
        // this.realm.sendData(NETWORKING_OPCODES.USER.JOIN, {
        //     username: this.conjure.getProfile().getUsername()
        // })

        this.conjure.setConjureMode(CONJURE_MODE.EXPLORE)
        return true
    }    
    
    async forceReloadCurrentRealm()
    {
        await this.getRealms()
        await this.joinRealmByID(this.realm.realmID, { force: true })
    }

    async waitForPasscode(passcodes)
    {
        return new Promise((resolve) => {
            this.conjure.loadingScreen.setPasscodeCallback(
                async (attempt) => {
                    if(attempt === undefined)
                        resolve(false)
                    if(passcodes.includes(attempt))
                        resolve(true)
                }
            )
        })
    }

    async joinRealmByID(id, args = {})
    {
        if(!id) return false
        if(this.realm && this.realm.loading)
            return false

        let realm = await this.getRealm(id, true)
        if(!realm) return false
        
        let realmData = new RealmData(realm)
        if(!realmData) return false
        
        if(!await this.joinRealm(realmData, args))
            await this.joinRealmByID(this.lastRealmID, args)
        return true
    }

    getScreensDisabled()
    {
        if(!this.realm) return false
        if(this.realm.realmData.getData().worldData.disableScreens)
            return true
        return false
    }

    // { delta, input, mouseRaycaster, worldRaycaster, conjure }

    update(updateArgs)
    {
        this.user.update(updateArgs);
        if(this.realm)
            this.realm.update(updateArgs)
        
        let interact = false;
        let interactDistance = this.interactMaxDistance;
        for(let remoteUser of Object.values(this.remoteUsers))
        {
            if(remoteUser.timedOut) continue

            remoteUser.update(updateArgs)
            if(remoteUser && remoteUser.group) // make sure we havent destroyed user in update loop
                if(!interact && this.conjure.conjureMode === CONJURE_MODE.EXPLORE)
                {
                    let intersections = this.conjure.worldRaycaster.intersectObject(remoteUser.group, true);
                    if(intersections.length > 0 && intersections[0].distance < interactDistance)
                    {
                        interactDistance = intersections[0].distance;
                        interact = true;
                        this.conjure.screenManager.hudExplore.interact.setObject(remoteUser, INTERACT_TYPES.USER);
                    }
                }
        }
        if(this.conjure.conjureMode === CONJURE_MODE.EXPLORE)
        {
            // TODO: this uses the old audio manager to find audio sources, should add a worker-side list of media elements and use that instead
            // let intersections = this.conjure.worldRaycaster.intersectObjects(this.conjure.getAudioManager().getSources(), true);
            // if(intersections.length > 0 && intersections[0].distance < interactDistance)
            // {
            //     interact = true;
            //     this.conjure.screenManager.hudExplore.interact.setObject(intersections[0].object, INTERACT_TYPES.VIDEO);
            // }
            // if(!interact)
            //     this.conjure.screenManager.hudExplore.interact.setObject();
        }
        // if(this.conjure.conjureMode === CONJURE_MODE.EXPLORE)
        // {
        //     let intersections = this.conjure.worldRaycaster.intersectObjects(this.realm.getObjectManager().objects, true);
        //     if(intersections.length > 0 && intersections[0].distance < interactDistance)
        //     {
        //         interact = true;
        //         this.conjure.screenManager.hudExplore.interact.setObject(intersections[0].object, INTERACT_TYPES.OBJECT);
        //     }
        //     if(!interact)
        //         this.conjure.screenManager.hudExplore.interact.setObject();
        // }
        if(this.user.group && this.user.group.body)
            this.getWorldUpdates(updateArgs)
    }

    getWorldUpdates()
    {
        let deltaUpdate = true;
        this.updateCount++;
        if(this.updateCount > this.savePeriod * 60)
        {
            this.updateCount = 0; 
            deltaUpdate = false;
        }
        if(this.updateCount % this.updateCountMax === 0) // TODO: add delta updating
        {
            if(!deltaUpdate)
                this.sendData(NETWORKING_OPCODES.HEARTBEAT, {})
            let payload = {
                position: this.user.group.getWorldPosition(this.vec3),
                rotation: this.user.group.getWorldQuaternion(this.quat),
                velocity: this.user.group.body.velocity,
            }
            if(deltaUpdate || !_.isEqual(this.lastUserUpdate, payload))
            {
                this.lastUserUpdate = payload;
                this.sendData(NETWORKING_OPCODES.USER.MOVE, payload);
            }
        }
    }

    async sendData(protocol, data)
    {
        if(this.realm)
            await this.realm.sendData(protocol, data);
    }

    async sendTo(protocol, data, peerID)
    {
        if(this.realm)
            await this.realm.sendTo(protocol, data, peerID);
    }

    // TODO: if user joins with same discordID and diff peerID, need to figure out implications

    onUserJoin(data, peerID)
    {
        if(this.remoteUsers[peerID]) return
        
        this.remoteUsers[peerID] = new UserRemote(this.conjure, data, peerID)
        window.CONSOLE.log(data.username + ' has joined')
    }
    
    
    destroyAllRemoteUsers()
    {
        for(let remoteUser of Object.values(this.remoteUsers))
        {
            // this.conjure.physics.destroy(this.users[u].group.body)
            this.scene.remove(remoteUser.group)
            delete this.remoteUsers[remoteUser.peerID]
        }
    }

    onUserLeave(peerID)
    {
        if(!this.remoteUsers[peerID]) return
        
        window.CONSOLE.log(this.remoteUsers[peerID].username + ' has left')
        // this.conjure.physics.destroy(this.users[u].group.body)
        this.scene.remove(this.remoteUsers[peerID].group)
        delete this.remoteUsers[peerID]
    }

    // acts as heartbeat too
    onUserUpdate(data, peerID)
    {
        if(!this.remoteUsers[peerID]) return
        
        this.remoteUsers[peerID].updateInfo(data);
    }

    onUserAnimation(data, peerID)
    {
        if(!this.remoteUsers[peerID]) return
        
        this.remoteUsers[peerID].setAction(data.name, data.fadeTime, data.once, data.startTime)
    }
    
    onUserMove(data, peerID)
    {
        if(!this.remoteUsers[peerID]) return
        
        this.remoteUsers[peerID].setPhysics(data)
    }

    getObjects()
    {
        if(!this.realm) return []
        return this.realm.getObjectManager().objects
    }
}