import test from 'ava'
import app from '../src/app/index.js'

import { server } from '@AssetSync/WorldSync'

import { config } from './util/create-libp2p.js'
import { relay } from './util/relay.js'

import assetSync from './util/mock-assetsync.js'
import delay from 'delay'

await relay(config)

const assetSync1 = await assetSync()
const assetSync2 = await assetSync(assetSync1.transportPlugin._libp2p)

const appInstances = [await app({ assetSync: assetSync1 }), await app({ assetSync: assetSync2 })]

const objData = {
    uuid: 'hello',
    name: 'world'
}

const database0 = appInstances[0].realms.getDatabase('Lobby')
const database1 = appInstances[1].realms.getDatabase('Lobby')

test.serial('can find peers', t => {
    return new Promise((resolve) => {
        database0.network.on('onPeerJoin', (id) => {
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
        database1.on(opcode, resolve)
        const [peer] = database0.network.getPeers()
        database0.sendTo(peer, opcode, content)
    }).then((result) => {
        t.is(result, content)
    })
})

test.serial('can put and get', async (t) => {
    return new Promise(async (resolve) => {
        await database0.createObject({ uuid: objData.uuid, data: objData })
        const [obj] = await database0.getObjects()
        resolve(obj)
    }).then((obj) => {
        t.not(obj, undefined)
        t.deepEqual(obj.uuid, objData.uuid)
        t.deepEqual(obj.data, objData)
    })
})

test.serial('can dereference', async (t) => {
    return new Promise(async (resolve) => {
        await database0.dereferenceObject({ uuid: objData.uuid })
        const objs = await database0.getObjects()
        resolve(objs)
    }).then((objs) => {
        t.not(objs, undefined)
        t.is(objs.length, 0)
    })
})

test.serial('can put and get across peers', async (t) => {
    return new Promise(async (resolve) => {
        await database0.createObject({ uuid: objData.uuid, data: objData })
        await delay(50)
        const [obj] = await database1.getObjects()
        resolve(obj)
    }).then((obj) => {
        t.not(obj, undefined)
        t.deepEqual(obj.uuid, objData.uuid)
        t.deepEqual(obj.data, objData)
    })
})

test.serial('can dereference across peers', async (t) => {
    return new Promise(async (resolve) => {
        await database0.dereferenceObject({ uuid: objData.uuid })
        await delay(50)
        const objs = await database1.getObjects()
        resolve(objs)
    }).then((objs) => {
        t.not(objs, undefined)
        t.is(objs.length, 0)
    })
})



/** TODO
 * close and open database  (requires repo)
 * close, dereference, open, and fail to get
 *  */


test.serial.after.always(async () => {
    // remove repo
    // await peer1.storagePlugin.storage.files.rmdir(process.cwd() + '/test/database-test/', { recursive: true })
})
