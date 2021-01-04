import test from 'ava'
import app from '../src/app/index.js'

import { config } from './util/create-libp2p.js'
import { relay } from './util/relay.js'

import assetSync from './util/mock-assetsync.js'
import delay from 'delay'

import { GLOBAL_REALMS } from '../src/app/backend/realm/RealmData.js'

import { randomString } from '@AssetSync/common/src/randomString.js'

await relay(config)

const testLogger = (num) => {
    return (...args) => {
        // console.log(num, 'TEST: ', ...args) // uncomment this for debugging logs
    }
}

const assetSync1 = await assetSync()
const assetSync2 = await assetSync(assetSync1.transportPlugin._libp2p)

const appInstances = [await app({ assetSync: assetSync1 }), await app({ assetSync: assetSync2 })]

const objData = {
    uuid: randomString(8),
    name: randomString(8)
}

const newObjData = randomString(8)

const database0 = () => { return appInstances[0].realms.getDatabase('Lobby') }
const database1 = () => { return appInstances[1].realms.getDatabase('Lobby') }

test.serial('can find peers', t => {
    return new Promise((resolve) => {
        database0().network.on('onPeerJoin', (id) => {
            resolve(id)
        })
    }).then((result) => {
        t.is(result, assetSync2.transportPlugin._libp2p.peerId.toB58String())
    })
})

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
        await database0().createObject({ uuid: objData.uuid, data: objData })
        const [obj] = await database0().getObjects()
        resolve(obj)
    }).then((obj) => {
        t.not(obj, undefined)
        t.deepEqual(obj.uuid, objData.uuid)
        t.deepEqual(obj.data, objData)
    })
})

test.serial('can dereference', async (t) => {
    return new Promise(async (resolve) => {
        await database0().dereferenceObject({ uuid: objData.uuid })
        const objs = await database0().getObjects()
        resolve(objs)
    }).then((objs) => {
        t.not(objs, undefined)
        t.is(objs.length, 0)
    })
})

test.serial('can put and get across peers', async (t) => {
    return new Promise(async (resolve) => {
        await database0().createObject({ uuid: objData.uuid, data: objData })
        await delay(200)
        const [obj] = await database1().getObjects()
        resolve(obj)
    }).then((obj) => {
        t.not(obj, undefined)
        t.deepEqual(obj.uuid, objData.uuid)
        t.deepEqual(obj.data, objData)
    })
})

test.serial('can dereference across peers', async (t) => {
    return new Promise(async (resolve) => {
        await database0().dereferenceObject({ uuid: objData.uuid })
        await delay(200)
        const objs = await database1().getObjects()
        resolve(objs)
    }).then((objs) => {
        t.not(objs, undefined)
        t.is(objs.length, 0)
    })
})

test.serial('can close datastore', async (t) => {
    return new Promise(async (resolve) => {
        await database0().createObject({ uuid: objData.uuid, data: objData })
        await appInstances[0].realms.removeDatabase('Lobby')
        resolve([database0(), appInstances[0].realms.getDatabase(GLOBAL_REALMS.LOBBY)])
    }).then(([result1, result2]) => {
        t.is(result1, undefined)
        t.is(result2, undefined)
    })
})

test.serial('can reopen datastore', async (t) => {
    return new Promise(async (resolve) => {
        await delay(200)
        await appInstances[0].realms.addDatabase(GLOBAL_REALMS.LOBBY, testLogger(0))
        const [obj] = await database0().getObjects()
        resolve(obj)
    }).then((obj) => {
        t.not(obj, undefined)
        t.deepEqual(obj.uuid, objData.uuid)
        t.deepEqual(obj.data, objData)
    })
})

test.serial('can sync dereferences', async (t) => {
    return new Promise(async (resolve) => {
        await appInstances[1].realms.removeDatabase('Lobby')
        await database0().dereferenceObject({ uuid: objData.uuid })
        await delay(500)
        await appInstances[1].realms.addDatabase(GLOBAL_REALMS.LOBBY, testLogger(1), true)
        await delay(1000)
        const [obj] = await database1().getObjects()
        resolve(obj)
    }).then((obj) => {
        t.is(obj, undefined)
    })
})

test.serial('can sync new entries', async (t) => {
    return new Promise(async (resolve) => {
        await appInstances[1].realms.removeDatabase('Lobby')
        await database0().createObject({ uuid: objData.uuid, data: objData })
        await delay(500)
        await appInstances[1].realms.addDatabase(GLOBAL_REALMS.LOBBY, testLogger(1), true)
        await delay(1000)
        const [obj] = await database1().getObjects()
        resolve(obj)
    }).then((obj) => {
        t.not(obj, undefined)
        t.deepEqual(obj.uuid, objData.uuid)
        t.deepEqual(obj.data, objData)
    })
})

test.serial('can sync outdated entries', async (t) => {
    return new Promise(async (resolve) => {
        await appInstances[1].realms.removeDatabase('Lobby')
        await database0().updateObject({ uuid: objData.uuid, data: newObjData })
        await delay(500)
        await appInstances[1].realms.addDatabase(GLOBAL_REALMS.LOBBY, testLogger(1), true)
        await delay(500)
        const [obj] = await database1().getObjects()
        resolve(obj)
    }).then((obj) => {
        t.not(obj, undefined)
        t.deepEqual(obj.uuid, objData.uuid)
        t.deepEqual(obj.data, newObjData)
    })
})

test.serial('should not update already up to date entries', async (t) => {
    return new Promise(async (resolve) => {
        
        const oldEntries = await database1()._getAllLocal()
        const oldTimestamp = oldEntries[0].timeReceived

        await appInstances[1].realms.removeDatabase('Lobby')
        await delay(500)
        await appInstances[1].realms.addDatabase(GLOBAL_REALMS.LOBBY, testLogger(1), true)
        
        await delay(500)
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
