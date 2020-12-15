import test from 'ava'

import createLibp2p from './dht/create-libp2p.js'
import Peer from './dht/peer.js'
import delay from 'delay'

async function createPeers(peerCount = 2) {

    const peers = []

    for (let i = 0; i < peerCount; i++) {
        const peer = new Peer(await createLibp2p())
        await peer.start()
        peers.push(peer)
    }

    return peers
}

test.serial('can put and get to DHT', async (t) => {

    const peers = await createPeers()

    const key = Math.random().toString(36)
    const value = Math.random().toString(36)

    return new Promise((resolve) => {

        peers[0].libp2pPlugin.on('peer:connect', async (connection) => {
            await delay(100) // wait for connection to complete
            await peers[0].dhtPlugin.put({ key, value })
        })

        peers[1].libp2pPlugin.on('peer:connect', async (connection) => {
            await delay(500) // wait for entry to propagate
            const result = await peers[1].dhtPlugin.get({ key, timeout: 1000 })
            resolve(result)
        })

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

    return new Promise((resolve) => {

        peers[0].libp2pPlugin.on('peer:connect', async (connection) => {
            await delay(100) // 
            try {
                await peers[0].dhtPlugin.put({ key, value, minPeers: 1 })
            } catch (error) {
                console.error(error)
            }
        })

        peers[1].dhtPlugin.dht.on('put', (key, value, from) => {
            resolve({ key, value, from })
        })

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

    try {
        await peers[0].dhtPlugin.addDHT(protocol)
        await peers[1].dhtPlugin.addDHT(protocol)
    }
    catch (error) {
        console.error(error)
    }

    const key = Math.random().toString(36)
    const value = Math.random().toString(36)

    return new Promise((resolve) => {

        peers[0].libp2pPlugin.on('peer:connect', async (connection) => {
            try {
                await delay(100) // wait for connection to complete
                await peers[0].dhtPlugin.put({ key, value, protocol })
            }
            catch (error) {
                console.error(error)
            }
        })

        peers[1].libp2pPlugin.on('peer:connect', async (connection) => {
            try {
                await delay(500) // wait for entry to propagate
                const result = await peers[1].dhtPlugin.get({ key, timeout: 1000, protocol })
                resolve(result)
            }
            catch (error) {
                console.error(error)
            }
        })

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

    return new Promise((resolve) => {

        peers[0].libp2pPlugin.on('peer:connect', async (connection) => {
            await delay(100) // 
            try {
                await peers[0].dhtPlugin.put({ key, value, minPeers: 1 })
            } catch (error) {
                console.error(error)
            }
        })

        peers[1].dhtPlugin.dht.on('put', (key, value, from) => {
            resolve({ key, value, from })
        })

    }).then(async (result) => {
        t.is(result.key, key)
        t.is(result.value, value)
        t.is(result.from, peers[0].libp2pPlugin.getPeerID())
        await peers[0].libp2pPlugin._libp2p.stop()
        await peers[1].libp2pPlugin._libp2p.stop()
    })
})

test.serial('getAllLocal', async (t) => {

    const [peer] = await createPeers(1)

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