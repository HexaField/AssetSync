import * as THREE from 'three'
import { NETWORKING_OPCODES } from '../../backend/Constants.js'
import Realm from './realm/Realm.js'
import User from '../user/User.js'
import UserRemote from '../user/UserRemote.js'
import { CONJURE_MODE } from '../Conjure.js'
import { INTERACT_TYPES } from '../screens/hud/HUDInteract.js'
import RealmData, { REALM_WORLD_GENERATORS, REALM_WHITELIST, GLOBAL_REALMS, REALM_TYPES } from '../../backend/realm/RealmData.js'
import _ from 'lodash'
import { number } from '@AssetSync/common'

export default class World {
    constructor(conjure) {
        this.conjure = conjure
        this.scene = this.conjure.scene

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

        this.onUserData = this.onUserData.bind(this)
        this.onUserLeave = this.onUserLeave.bind(this)
        this.onUserMove = this.onUserMove.bind(this)
        this.onUserAnimation = this.onUserAnimation.bind(this)
    }

    async loadDefault() {
        if (this.conjure.urlParams.r) {
            if (await this.joinRealmByID(this.conjure.urlParams.r))
                return
        }
        else {
            if (await this.joinRealmByID(number(await window.clientDatastore.get('conjure-profile-lastJoinedRealm'))))
                return

        }
        await this.joinRealmByID('Lobby')
    }

    async getRealms() {
        let realms = {}

        for (let realm of await this.conjure.getProfile().getServiceManager().getRealmsFromConnectedServices())
            realms[realm.id] = new RealmData(realm)

        for (let realm of await this.conjure.realms.getRealms())
            realms[realm.id] = new RealmData(realm)

        for (let realm of this.globalRealms) {
            realms[realm.id] = realm
        }

        return Object.values(realms).sort((a, b) => { return a.timestamp > b.timestamp })
    }

    async getRealm(id) {
        for (let realm of this.globalRealms)
            if (id === realm.id)
                return realm

        return await this.conjure.realms.getRealmById(id, true)
    }

    async preloadGlobalRealms() {
        for (let realm of Object.values(GLOBAL_REALMS)) {
            const realmData = new RealmData(realm)
            realmData.type = REALM_TYPES.GLOBAL
            this.globalRealms.push(realmData)
        }
    }

    async joinRealm(realmData, args = {}) {
        if (!args.force && this.realm && realmData.getID() === this.realm.realmID) return false
        if (this.realm) {
            this.lastRealmID = this.realm.realmID
            this.sendData(NETWORKING_OPCODES.USER.LEAVE)
            await this.realm.leave()
            this.destroyAllRemoteUsers()
            delete this.realm
        }

        this.conjure.setConjureMode(CONJURE_MODE.LOADING)
        this.conjure.loadingScreen.setText('Joining realm...', false)

        if (realmData.whitelist) {
            if (realmData.whitelist.type === REALM_WHITELIST.SERVICE) {
                if (!this.conjure.getProfile().getServiceManager().getServiceLinked('Discord')) return false
                // if(!realmData.whitelist.ids.includes(this.conjure.getProfile().getServiceManager().getService('Discord').data.discordID)) return false
            }
            if (realmData.whitelist.type === REALM_WHITELIST.PASSCODE) {
                this.conjure.setConjureMode(CONJURE_MODE.LOADING)
                this.conjure.loadingScreen.setPasscodeVisible(true)
                console.log('Waiting for valid passcode...')
                if (!await this.waitForPasscode(realmData.whitelist.ids)) {
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
        await window.clientDatastore.put('conjure-profile-lastJoinedRealm', String(realmData.getID())) // make a thing for this

        this.conjure.loadingScreen.setText('Pre-loading realm...', false)
        await this.realm.preload()
        this.conjure.loadingScreen.setText('Loading realm...', false)
        await this.realm.load()
    
        this.sendMetadata()
        this.requestMetadata()

        let spawn = realmData.worldData.spawnPosition || new THREE.Vector3(0, 1, 0)
        this.spawnLocation = spawn
        this.user.teleport(spawn.x, spawn.y, spawn.z)

        this.conjure.setConjureMode(CONJURE_MODE.EXPLORE)
        return true
    }

    async forceReloadCurrentRealm() {
        await this.getRealms()
        await this.joinRealmByID(this.realm.realmID, { force: true })
    }

    async waitForPasscode(passcodes) {
        return new Promise((resolve) => {
            this.conjure.loadingScreen.setPasscodeCallback(
                async (attempt) => {
                    if (attempt === undefined)
                        resolve(false)
                    if (passcodes.includes(attempt))
                        resolve(true)
                }
            )
        })
    }

    async joinRealmByID(id, args = {}) {
        if (!id) return false
        if (this.realm && this.realm.loading)
            return false

        let realm = await this.getRealm(id, true)
        if (!realm) return false

        let realmData = new RealmData(realm)

        if (!await this.joinRealm(realmData, args))
            await this.joinRealmByID(this.lastRealmID, args)
        return true
    }

    getScreensDisabled() {
        if (!this.realm) return false
        if (this.realm.realmData.worldData.disableScreens)
            return true
        return false
    }

    // { delta, input, mouseRaycaster, worldRaycaster, conjure }

    update(updateArgs) {
        this.user.update(updateArgs);
        if (this.realm)
            this.realm.update(updateArgs)

        let interact = false;
        let interactDistance = this.interactMaxDistance;
        for (let remoteUser of Object.values(this.remoteUsers)) {
            if (remoteUser.timedOut) continue

            remoteUser.update(updateArgs)
            if (remoteUser && remoteUser.group) // make sure we havent destroyed user in update loop
                if (!interact && this.conjure.conjureMode === CONJURE_MODE.EXPLORE) {
                    let intersections = this.conjure.worldRaycaster.intersectObject(remoteUser.group, true);
                    if (intersections.length > 0 && intersections[0].distance < interactDistance) {
                        interactDistance = intersections[0].distance;
                        interact = true;
                        this.conjure.screenManager.hudExplore.interact.setObject(remoteUser, INTERACT_TYPES.USER);
                    }
                }
        }
        if (this.conjure.conjureMode === CONJURE_MODE.EXPLORE) {
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
        if (this.realm && this.user.group && this.user.group.body)
            this.getWorldUpdates(updateArgs)
    }

    roundInt(int, num) {
        return parseFloat(String(int)).toFixed(num)
    }

    getWorldUpdates() {
        let deltaUpdate = true;
        this.updateCount++;
        if (this.updateCount > this.savePeriod * 60) {
            this.updateCount = 0;
            deltaUpdate = false;
        }
        if (this.updateCount % this.updateCountMax === 0) // TODO: add delta updating
        {
            // if(!deltaUpdate)
            //     this.sendData(NETWORKING_OPCODES.HEARTBEAT, {})

            const pos = this.user.group.getWorldPosition(this.vec3)
            const position = {
                x: Math.round(pos.x * 100),
                y: Math.round(pos.y * 100),
                z: Math.round(pos.z * 100),
            }
            const quat = this.user.group.getWorldQuaternion(this.quat)
            const rotation = {
                x: Math.round(quat._x * 100),
                y: Math.round(quat._y * 100),
                z: Math.round(quat._z * 100),
                w: Math.round(quat._w * 100)
            }
            const velocity = {
                x: Math.round(this.user.group.body.velocity.x * 100),
                y: Math.round(this.user.group.body.velocity.y * 100),
                z: Math.round(this.user.group.body.velocity.z * 100)
            }
            let payload = {
                position,
                rotation,
                velocity
            }
            if (deltaUpdate || !_.isEqual(this.lastUserUpdate, payload)) {
                this.sendData(NETWORKING_OPCODES.USER.MOVE, payload);
                this.lastUserUpdate = payload;
            }
        }
    }

    async sendData(opcode, data = {}) {
        if (!this.realm) return
        // const message = this.conjure.networkingSchemas.encode(opcode, data)
        // await this.realm.network.broadcast(message)
        this.realm.sendData(opcode, data)
    }

    async sendTo(opcode, data = {}, peerID) {
        if (!this.realm) return
        // const message = this.conjure.networkingSchemas.encode(opcode, data)
        // await this.realm.network.sendTo(peerId, message)
        this.realm.sendTo(opcode, data, peerID)
    }

    sendMetadata(peerID) {
        if(peerID) {
            this.realm.sendTo(NETWORKING_OPCODES.USER.METADATA, {
                username: this.conjure.getProfile().getUsername()
            }, peerID)
        } else {
            this.realm.sendData(NETWORKING_OPCODES.USER.METADATA, {
                username: this.conjure.getProfile().getUsername()
            })
        }
    }

    requestMetadata(peerID) {
        if(peerID) {
            this.realm.sendTo(NETWORKING_OPCODES.USER.REQUEST_METADATA, {}, peerID)
        } else {
            this.realm.sendData(NETWORKING_OPCODES.USER.REQUEST_METADATA, {})
        }
    }

    onUserData(data, peerID) {
        if (this.remoteUsers[peerID]) {
            this.remoteUsers[peerID].updateInfo(data);
        }
        else {
            // this.sendMetadata(peerID)
            this.remoteUsers[peerID] = new UserRemote(this.conjure, data, peerID)
            window.CONSOLE.log(data.username + ' has joined')
            this.remoteUsers[peerID].getConnection()
        }
    }


    destroyAllRemoteUsers() {
        for (let remoteUser of Object.values(this.remoteUsers)) {
            // this.conjure.physics.destroy(this.users[u].group.body)
            remoteUser.destroy()
            delete this.remoteUsers[remoteUser.peerID]
        }
    }

    onUserLeave(peerID) {
        if (!this.remoteUsers[peerID]) return

        window.CONSOLE.log(this.remoteUsers[peerID].username + ' has left')
        // this.conjure.physics.destroy(this.users[u].group.body)
        this.remoteUsers[peerID].destroy()
        delete this.remoteUsers[peerID]
    }

    onUserAnimation(data, peerID) {
        if (!this.remoteUsers[peerID]) {
            this.requestMetadata(peerID)
            return
        }

        this.remoteUsers[peerID].setAction(data.name.trim(), data.fadeTime, data.once, data.startTime)
    }

    onUserMove(data, peerID) {
        if (!this.remoteUsers[peerID]) {
            this.requestMetadata(peerID)
            return
        }

        this.remoteUsers[peerID].setPhysics(data)
    }

    getObjects() {
        if (!this.realm) return []
        return this.realm.getObjectManager().objects
    }
}