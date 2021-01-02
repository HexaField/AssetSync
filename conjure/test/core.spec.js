import test from 'ava'
import app from '../src/app/index.js'

import { server } from '@AssetSync/WorldSync'

import { config } from './util/create-libp2p.js'
import { relay } from './util/relay.js'
import delay from 'delay'

import assetSync from './util/mock-assetsync.js'
import RealmData from '../src/app/backend/realm/RealmData.js'

import { randomString } from '@AssetSync/common/src/randomString.js'

await relay(config)

test.serial('can start backend', async (t) => {

    const App = await server(app)

    return new Promise(async (resolve) => {
        resolve(App)
    }).then((results) => {
        t.not(results.assetSync, undefined)
        t.not(results.assetSync.networkPlugin, undefined)
        t.not(results.assetSync.dhtPlugin, undefined)
    })
})

test.serial('can find peers', async (t) => {

    const assetSync1 = await assetSync()
    const assetSync2 = await assetSync(assetSync1.transportPlugin._libp2p)

    const appInstances = [await app({ assetSync: assetSync1 }), await app({ assetSync: assetSync2 })]
    
    return new Promise(async (resolve) => {
        appInstances[0].globalNetwork.on('onPeerJoin', (peerId) => {
            resolve(peerId)
        })
    }).then((results) => {
        t.is(results, assetSync2.transportPlugin._libp2p.peerId.toB58String())
    })
})

const mockRealm = new RealmData({
    id: randomString(8),
    name: randomString(8),
})

test.serial('can find realm', async (t) => {

    const assetSync1 = await assetSync()
    const appInstance1 = await app({ assetSync: assetSync1 })
    const assetSync2 = await assetSync(assetSync1.transportPlugin._libp2p)
    const appInstance2 = await app({ assetSync: assetSync2 })
    await appInstance1.realms.createRealm(mockRealm)
    await delay(100)
    
    return new Promise(async (resolve) => {
        const realmData = await appInstance2.realms.getRealmById(mockRealm.id)
        resolve(realmData)
    }).then((results) => {
        t.deepEqual(results, Object.assign({}, mockRealm))
    })
})
