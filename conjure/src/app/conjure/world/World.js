import { THREE, ExtendedGroup } from 'enable3d'
import Realm, { REALM_PROTOCOLS, GLOBAL_REALMS } from './realm/Realm.js'
import User from '../user/User.js'
import UserRemote from '../user/UserRemote.js'
import { CONJURE_MODE } from '../Conjure.js'
import { INTERACT_TYPES } from '../screens/hud/HUDInteract.js'
import RealmData, { REALM_WORLD_GENERATORS, REALM_WHITELIST } from './realm/RealmData.js'
import _ from 'lodash'
// import { SERVER_PROTOCOLS } from '../../data/DataHandler';

export default class World
{
    constructor(conjure)
    {
        this.conjure = conjure
        this.scene = this.conjure.scene

        this.realmHandler = conjure.server.realms

        this.group = new ExtendedGroup()
        this.scene.add(this.group)

        this.user = new User(conjure);
        this.users = [];

        this.lastUserUpdate = {};

        this.savePeriod = 5; // save every 5 seconds
        this.updatesPerSecond = 20; // update peers every 1/xth of a second 
        this.updateCount = 0;
        this.updateCountMax = 60 / this.updatesPerSecond;

        this.interactMaxDistance = 4
        
        this.deltaThreshold = 0.1;

        this.vec3 = new THREE.Vector3();
        this.quat = new THREE.Quaternion();

        this.globalRealms = []
        this.spawnLocation = new THREE.Vector3(0, 2, 0)
        this.lastRealmID = 'Lobby'
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

        // for(let realm of await this.conjure.getDataHandler().getRealms())  
        //     realms[realm.id] = new RealmData(realm).getData()

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
        
        // for(let pinned of await this.conjure.getDataHandler().getRealms())
        // {
        //     if(realms[pinned.id])
        //         realms[pinned.id].pinned = true
        //     else
        //         realms[pinned.id] = { realmData: new RealmData(pinned).getData(), pinned: true }
        // }

        for(let realm of this.globalRealms)   
            realms[realm.id] = { realmData: realm, pinned: 'global' }
        
        return Object.values(realms)
    }

    async getRealm(id, getPrivate)
    {
        for(let realm of this.globalRealms)
            if(id === realm.id)
                return realm
        
        // return await this.conjure.getDataHandler().getRealm(id)
    }

    async preloadGlobalRealms()
    {
        for(let realm of Object.values(GLOBAL_REALMS))
        {
            const realmData = new RealmData(realm).getData()
            realmData.global = true
            this.globalRealms.push(realmData)
            // await this.conjure.getDataHandler().pinRealm({data: realmData, pin: true })
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

        let spawn = realmData.getData().worldData.spawnPosition || new THREE.Vector3(0, 1, 0)
        this.spawnLocation = spawn
        this.user.teleport(spawn.x, spawn.y, spawn.z)
        
        this.realm.sendData(REALM_PROTOCOLS.USER.JOIN, {
            username: this.conjure.getProfile().getUsername()
        })

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
        for(let user in this.users)
        {
            if(this.users[user].timedOut) continue

            this.users[user].update(updateArgs)
            if(this.users[user] && this.users[user].group) // make sure we havent destroyed user in update loop
                if(!interact && this.conjure.conjureMode === CONJURE_MODE.EXPLORE)
                {
                    let intersections = this.conjure.worldRaycaster.intersectObject(this.users[user].group, true);
                    if(intersections.length > 0 && intersections[0].distance < interactDistance)
                    {
                        interactDistance = intersections[0].distance;
                        interact = true;
                        this.conjure.screenManager.hudExplore.interact.setObject(this.users[user], INTERACT_TYPES.USER);
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
                this.sendData(REALM_PROTOCOLS.HEARTBEAT, {})
            let payload = {
                physics: {
                    p:this.user.group.getWorldPosition(this.vec3),
                    r:this.user.group.getWorldQuaternion(this.quat),
                    v:this.user.group.body.velocity,
                }
            }
            if(deltaUpdate || !_.isEqual(this.lastUserUpdate, payload))
            {
                this.lastUserUpdate = payload;
                this.sendData(REALM_PROTOCOLS.USER.MOVE, payload);
            }
        }
    }

    receiveDataFromPeer(data, peerID)
    {
        /// send through a list of objects that are your copy
        // if(data.protocol !== REALM_PROTOCOLS.USER.MOVE) console.log('parsing data from user', data)
        switch(data.protocol) {
            case REALM_PROTOCOLS.HEARTBEAT: this.onUserUpdate({}, peerID); break;
            case REALM_PROTOCOLS.USER.JOIN: this.onUserJoin(data.content, peerID); break;
            case REALM_PROTOCOLS.USER.UPDATE: this.onUserUpdate(data.content, peerID); break;
            case REALM_PROTOCOLS.USER.MOVE: this.onUserMove(data.content, peerID); break;
            case REALM_PROTOCOLS.USER.LEAVE: this.onUserLeave(peerID); break;
            case REALM_PROTOCOLS.USER.ANIMATION: this.onUserAnimation(data.content, peerID); break;
            default: break;
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
        let exists = false;
        for(let user of this.users)
            if(peerID === user.peerID)
            {
                exists = true;
                break
            }
        if(exists)
        {
            this.onUserLeave(peerID)
        }
        this.users.push(new UserRemote(this.conjure, data.username, peerID))
        global.CONSOLE.log(data.username + ' has joined')
    }
    
    
    destroyAllRemoteUsers()
    {
        for(let u = 0; u < this.users.length; u++)
        {
            // this.conjure.physics.destroy(this.users[u].group.body)
            this.scene.remove(this.users[u].group)
            this.users.splice(u, 1);
        }
    }

    onUserLeave(peerID)
    {
        for(let u = 0; u < this.users.length; u++)
            if(peerID === this.users[u].peerID)
            {
                global.CONSOLE.log(this.users[u].username + ' has left')
                // this.conjure.physics.destroy(this.users[u].group.body)
                this.scene.remove(this.users[u].group)
                this.users.splice(u, 1);
                break
            }
    }

    // acts as heartbeat too
    onUserUpdate(data, peerID)
    {
        let exists = false
        for(let u = 0; u < this.users.length; u++)
            if(peerID === this.users[u].peerID)
            {
                this.users[u].updateInfo(data);
                exists = true
                break
            }
        if(!exists)
            this.onUserJoin(data, peerID); // need to retire this eventually
    }

    onUserAnimation(data, peerID)
    {
        for(let u of this.users)
            if(peerID === u.peerID)
            {
                u.setAction(data.name, data.fadeTime, data.once, data.startTime)
                break
            }
    }
    // TODO: figure out the role of peerID since we use discord id to auth for now - we really need a user UUID
    onUserMove(data, peerID)
    {
        for(let u of this.users)
            if(peerID === u.peerID)
            {
                u.setPhysics(data.physics);
                break
            }
    }

    getObjects()
    {
        if(!this.realm) return []
        return this.realm.getObjectManager().objects
    }
}