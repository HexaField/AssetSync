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

async function createInstances(num) {
    const instances = []
    for(let i = 0; i < num; i++) {
        instances.push(await app({ assetSync: await assetSync(i > 0 ? instances[0].assetSync.transportPlugin._libp2p : undefined) }))
    }
    return instances
}

test.serial('can start backend with worldsync', async (t) => {

    const App = await server(app, process.cwd() + `/test/dbs/database-${randomString(8)}/`)

    return new Promise(async (resolve) => {
        resolve(App)
    }).then((results) => {
        t.not(results.assetSync, undefined)
        t.not(results.assetSync.networkPlugin, undefined)
        t.not(results.assetSync.dhtPlugin, undefined)
    })
})

test.serial('can find peers', async (t) => {

    const appInstances = await createInstances(2)
    
    return new Promise(async (resolve) => {
        appInstances[0].globalNetwork.on('onPeerJoin', (peerId) => {
            resolve(peerId)
        })
    }).then((results) => {
        t.is(results, appInstances[1].assetSync.transportPlugin._libp2p.peerId.toB58String())
    })
})

const mockRealm = new RealmData({
    id: randomString(8),
    name: randomString(8),
})

test.serial('can find realm', async (t) => {

    const appInstances = await createInstances(2)
    await appInstances[0].realms.createRealm(mockRealm)
    await delay(100)
    
    return new Promise(async (resolve) => {
        const realmData = await appInstances[1].realms.getRealmById(mockRealm.id)
        resolve(realmData)
    }).then((results) => {
        t.deepEqual(results, Object.assign({}, mockRealm))
    })
})
