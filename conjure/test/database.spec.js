import test from 'ava'
import app from '../src/app/index.js'

import { config } from './util/create-libp2p.js'
import { relay } from './util/relay.js'

import assetSync from './util/mock-assetsync.js'
import delay from 'delay'

import { REALM_WORLD_GENERATORS } from '../src/app/backend/realm/RealmData.js'

import { randomString } from '@AssetSync/common/src/randomString.js'

import * as THREE from 'three'
const objectLoader = new THREE.ObjectLoader();

await relay(config)

const testLogger = (num) => {
    return (...args) => {
        console.log(num, 'TEST: ', ...args) // uncomment this for debugging logs
    }
}

globalThis.useMemory = false

const assetSync1 = await assetSync()
const assetSync2 = await assetSync(assetSync1.transportPlugin._libp2p)

const appInstances = [await app({ assetSync: assetSync1 }), await app({ assetSync: assetSync2 })]

const objData = new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.MeshStandardMaterial())
const newObjData = objectLoader.parse(objData.toJSON())
newObjData.geometry = new THREE.SphereBufferGeometry()
newObjData.material = new THREE.MeshNormalMaterial()

const mockRealmData = {
    id: 'test',
    name: 'test',
    timestamp: -1,
    worldSettings: {
        features: ['Lobby', 'Platform'],
        worldGeneratorType: REALM_WORLD_GENERATORS.NONE
    }
}

const cloneObject = (object) => {
    return objectLoader.parse(object.toJSON())
}

const database0 = () => { return appInstances[0].realms.getDatabase(mockRealmData) }
const database1 = () => { return appInstances[1].realms.getDatabase(mockRealmData) }

await Promise.allSettled([
    appInstances[0].realms.addDatabase(mockRealmData, testLogger(0), true),
    appInstances[1].realms.addDatabase(mockRealmData, testLogger(1), true)
])

test.serial('can message peers', t => {
    const opcode = 'message'
    const content = 'hi peer'
    return new Promise((resolve) => {
        database1().on(opcode, resolve)
        const [peer] = database0().network.getPeers()
        database0().sendTo(peer, opcode, content)
    }).then((result) => {
        t.is(result, content)
    })
})

test.serial('can put and get', async (t) => {
    return new Promise(async (resolve) => {
        await database0().createObject(cloneObject(objData))
        const [obj] = await database0().getObjects()
        resolve(obj)
    }).then((obj) => {
        t.not(obj, undefined)
        t.deepEqual(obj.toJSON(), objData.toJSON())
    })
})


test.serial('can update entry', async (t) => {
    return new Promise(async (resolve) => {
        const obj = await database0().world.getObject(objData.uuid)
        obj.geometry = newObjData.geometry
        obj.material = newObjData.material
        await database0().updateObject(obj, ['geometry', 'material'])
        await database0().saveUpdates()
        const [obj2] = await database0().getObjects()
        resolve(obj2)
    }).then((obj) => {
        t.not(obj, undefined)
        t.is(obj.material.type, newObjData.material.type)
        t.is(obj.geometry.type, newObjData.geometry.type)
        t.deepEqual(obj.toJSON(), newObjData.toJSON())
    })
})

test.serial('can dereference', async (t) => {
    return new Promise(async (resolve) => {
        await database0().removeObject(newObjData)
        const objs = await database0().getObjects()
        resolve(objs)
    }).then((objs) => {
        t.not(objs, undefined)
        t.is(objs.length, 0)
    })
})

test.serial('can put and get across peers', async (t) => {
    return new Promise(async (resolve) => {
        await database0().createObject(cloneObject(objData))
        await delay(200)
        const [obj] = await database1().getObjects()
        resolve(obj)
    }).then((obj) => {
        t.not(obj, undefined)
        t.deepEqual(obj.toJSON(), objData.toJSON())
    })
})

test.serial('can dereference across peers', async (t) => {
    return new Promise(async (resolve) => {
        await database0().removeObject(objData)
        await delay(500)
        const objs = await database1().getObjects()
        resolve(objs)
    }).then((objs) => {
        t.not(objs, undefined)
        t.is(objs.length, 0)
    })
})

test.serial('can close database', async (t) => {
    return new Promise(async (resolve) => {
        await database0().createObject(cloneObject(objData))
        await appInstances[0].realms.removeDatabase(mockRealmData)
        resolve(database0())
    }).then((result) => {
        t.is(result, undefined)
    })
})

test.serial('can reopen database', async (t) => {
    return new Promise(async (resolve) => {
        await delay(200)
        await appInstances[0].realms.addDatabase(mockRealmData, testLogger(0), true)
        const [obj] = await database0().getObjects()
        resolve(obj)
    }).then((obj) => {
        t.not(obj, undefined)
        t.deepEqual(obj.toJSON(), objData.toJSON())
    })
})

test.serial('can sync dereferences', async (t) => {
    return new Promise(async (resolve) => {
        await appInstances[1].realms.removeDatabase(mockRealmData)
        await database0().removeObject(objData)
        await delay(500)
        await appInstances[1].realms.addDatabase(mockRealmData, testLogger(1), true)
        await delay(1000)
        const [obj] = await database1().getObjects()
        resolve(obj)
    }).then((obj) => {
        t.is(obj, undefined)
    })
})

test.serial('can sync new entries', async (t) => {
    return new Promise(async (resolve) => {
        await appInstances[1].realms.removeDatabase(mockRealmData)
        await database0().createObject(cloneObject(objData))
        await delay(500)
        await appInstances[1].realms.addDatabase(mockRealmData, testLogger(1), true)
        await delay(1000)
        const [obj] = await database1().getObjects()
        resolve(obj)
    }).then((obj) => {
        t.not(obj, undefined)
        t.deepEqual(obj.toJSON(), objData.toJSON())
    })
})

test.serial('can sync outdated entries', async (t) => {
    return new Promise(async (resolve) => {
        await appInstances[1].realms.removeDatabase(mockRealmData)
        const obj = await database0().world.getObject(objData.uuid)
        obj.geometry = newObjData.geometry
        obj.material = newObjData.material
        await database0().updateObject(newObjData, ['geometry', 'material'])
        await database0().saveUpdates()
        await delay(1000)
        await appInstances[1].realms.addDatabase(mockRealmData, testLogger(1), true)
        await delay(1000)
        const [obj2] = await database1().getObjects()
        resolve(obj2)
    }).then((obj) => {
        t.not(obj, undefined)
        t.is(obj.material.type, newObjData.material.type)
        t.is(obj.geometry.type, newObjData.geometry.type)
        t.deepEqual(obj.toJSON(), newObjData.toJSON())
    })
})

test.serial('should not update already up to date entries', async (t) => {
    return new Promise(async (resolve) => {
        const oldEntries = await database1()._getAllLocal()
        const oldTimestamp = oldEntries[0].timeReceived
        await appInstances[1].realms.removeDatabase(mockRealmData)
        await delay(500)
        await appInstances[1].realms.addDatabase(mockRealmData, testLogger(1), true)
        const newEntries = await database1()._getAllLocal()
        const newTimestamp = newEntries[0].timeReceived
        resolve([oldTimestamp, newTimestamp])
    }).then(([oldTimestamp, newTimestamp]) => {
        t.deepEqual(oldTimestamp, newTimestamp)
    })
})


/** TODO
 * close, dereference, open, and fail to get
 *  */


// test.serial.after.always(async () => {
//     // remove repo
//     await peer1.storagePlugin.storage.files.rmdir()
// })
