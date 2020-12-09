import test from 'ava'

import createLibp2p from './dht/create-libp2p.js'
import Peer from './dht/peer.js'
import delay from 'delay'
// import KadDHT from '../../common/src/libp2pkaddht/src/index.js'
// import KadDHT from 'libp2p-kad-dht'

import uint8ArrayFromString from 'uint8arrays/from-string.js'
import uint8ArrayToString from 'uint8arrays/to-string.js'

/**
 * DISCLAIMER!
 *    due to the fact that im too lazy to figure out how to get libp2p
 *    to work with the dht with the relay, im just gonna leave the onPut test as
 *    the only one here since it's really the only thing that needs to be tested
 * 
 * TODO: Figure out how to get this working without needing to use the signalling server
*/


async function createPeers(peerCount = 2) {

    const peers = []

    for (let i = 0; i < peerCount; i++) {
        const peer = new Peer(await createLibp2p())
        await peer.start()
        peers.push(peer)
    }

    return peers
}

// test.serial('can put and get to DHT', async (t) => {

//     const peers = await createPeers()

//     const key = Math.random().toString(36)
//     const value = Math.random().toString(36)

//     return new Promise((resolve) => {

//         peers[0].libp2pPlugin.on('peer:connect', async (connection) => {
//             await delay(100) // wait for connection to complete
//             await peers[0].dhtPlugin.put({ key, value })
//         })

//         peers[1].libp2pPlugin.on('peer:connect', async (connection) => {
//             await delay(500) // wait for entry to propagate
//             const result = await peers[1].dhtPlugin.get({ key, timeout: 1000 })
//             resolve(result)
//         })

//     }).then((result) => {
//         t.is(result, value)
//     })
// })

// test.serial('onPut event', async (t) => {

//     const peers = await createPeers()

//     const key = Math.random().toString(36)
//     const value = Math.random().toString(36)

//     return new Promise((resolve) => {

//         peers[0].libp2pPlugin.on('peer:connect', async (connection) => {
//             await delay(100) // 
//             try {
//                 await peers[0].dhtPlugin.put({ key, value, minPeers: 1 })
//             } catch (error) {
//                 console.error(error)
//             }
//         })

//         peers[1].dhtPlugin.dht.on('put', (key, value, from) => {
//             resolve({ key, value, from })
//         })

//     }).then((result) => {
//         t.is(result.key, key)
//         t.is(result.value, value)
//         t.is(result.from, peers[0].libp2pPlugin.getPeerID())
//     })
// })

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

    }).then((result) => {
        t.is(result, value)
    })
})


// TODO: add test for opening, putting, closing, opening and getting an entry in datastore with DHT