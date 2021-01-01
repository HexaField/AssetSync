import test from 'ava'

import createLibp2p, { config } from './dht/create-libp2p.js'
import Peer from './dht/peer.js'
import delay from 'delay'

import { relay } from './utils.js'
await relay(config)

async function createPeers() {

    const node1 = await createLibp2p()
    const node2 = await createLibp2p(node1)

    const peer1 = new Peer(node1)
    await peer1.start()

    const peer2 = new Peer(node2)
    await peer2.start()

    return [peer1, peer2]
}

test.serial('can put and get to DHT', async (t) => {

    const peers = await createPeers()
    peers[0].libp2pPlugin.on('peer:connect', async (connection) => {
        console.log(connection)
    })

    const key = Math.random().toString(36)
    const value = Math.random().toString(36)

    return new Promise(async (resolve) => {

        await peers[0].dhtPlugin.put({ key, value })
        await delay(100) // wait for entry to propagate
        const result = await peers[1].dhtPlugin.get({ key, timeout: 1000 })
        resolve(result)

    }).then(async (result) => {
        t.is(result, value)
        await peers[0].libp2pPlugin._libp2p.stop()
        await peers[1].libp2pPlugin._libp2p.stop()
    })
})

test.serial('onPut event', async (t) => {

    const peers = await createPeers()

    const key = Math.random().toString(36)
    const value = Math.random().toString(36)

    return new Promise(async (resolve) => {

        peers[1].dhtPlugin.dht.on('put', (key, value, from) => {
            resolve({ key, value, from })
        })

        await peers[0].dhtPlugin.put({ key, value, minPeers: 1 })

    }).then(async (result) => {
        t.is(result.key, key)
        t.is(result.value, value)
        t.is(result.from, peers[0].libp2pPlugin.getPeerID())
        await peers[0].libp2pPlugin._libp2p.stop()
        await peers[1].libp2pPlugin._libp2p.stop()
    })
})

test.serial('custom DHT', async (t) => {

    const peers = await createPeers()

    const protocol = '/test'

    await peers[0].dhtPlugin.addDHT(protocol)
    await peers[1].dhtPlugin.addDHT(protocol)

    const key = Math.random().toString(36)
    const value = Math.random().toString(36)

    return new Promise(async (resolve) => {

        await peers[0].dhtPlugin.put({ key, value, protocol })
        await delay(100) // wait for entry to propagate
        const result = await peers[1].dhtPlugin.get({ key, timeout: 1000, protocol })
        resolve(result)

    }).then(async (result) => {
        t.is(result, value)
        await peers[0].libp2pPlugin._libp2p.stop()
        await peers[1].libp2pPlugin._libp2p.stop()
    })
})


test.serial('put event', async (t) => {

    const peers = await createPeers()

    const key = Math.random().toString(36)
    const value = Math.random().toString(36)

    return new Promise(async (resolve) => {

        peers[1].dhtPlugin.dht.on('put', (key, value, from) => {
            resolve({ key, value, from })
        })
        await peers[0].dhtPlugin.put({ key, value, minPeers: 1 })

    }).then(async (result) => {
        t.is(result.key, key)
        t.is(result.value, value)
        t.is(result.from, peers[0].libp2pPlugin.getPeerID())
        await peers[0].libp2pPlugin._libp2p.stop()
        await peers[1].libp2pPlugin._libp2p.stop()
    })
})

test.serial('getAllLocal', async (t) => {

    const [peer] = await createPeers()

    const key = Math.random().toString(36)
    const value = Math.random().toString(36)

    return new Promise(async (resolve) => {

        // await delay(100)
        await peer.dhtPlugin.put({ key, value })
        resolve(await peer.dhtPlugin.getAllLocal())

    }).then(async (result) => {
        t.is(result.length, 1)
        t.is(result[0].key, key)
        t.is(result[0].value, value)
        await peer.libp2pPlugin._libp2p.stop()
    })
})

// TODO: add test for opening, putting, closing, opening and getting an entry in datastore with DHT