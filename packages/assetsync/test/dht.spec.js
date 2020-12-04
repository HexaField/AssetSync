import test from 'ava'

import createLibp2p from './dht/create-libp2p.js'
import Peer from './dht/peer.js'
import delay from 'delay'


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

//     const key = 'hello0'
//     const val = 'world0'

//     return new Promise((resolve) => {

//         peers[0].libp2pPlugin.on('peer:connect', async (connection) => {
//             await delay(100) // wait for connection to complete
//             await peers[0].dhtPlugin.put(key, val)
//         })

//         peers[1].libp2pPlugin.on('peer:connect', async (connection) => {
//             await delay(500) // wait for entry to propagate
//             const result = await peers[1].dhtPlugin.get(key, { timeout: 1000 })
//             resolve(result)
//         })

//     }).then((result) => {
//         t.is(result, val)
//     })
// })

test.serial('onPut event', async (t) => {

    const peers = await createPeers()

    const key = 'hello1'
    const val = 'world1'

    return new Promise((resolve) => {

        peers[0].libp2pPlugin.on('peer:connect', async (connection) => {
            await delay(100) // 
            try {
                await peers[0].dhtPlugin.put(key, val, 1)
            } catch (error) {
                console.error(error)
            }
        })

        peers[1].dhtPlugin.on('put', (key, value, from) => {
            resolve({ key, value, from })
        })

    }).then((result) => {
        t.is(result.key, key)
        t.is(result.value, val)
        t.is(result.from, peers[0].libp2pPlugin.getPeerID())
    })
})


// node1.peerStore.addressBook.set(node2.peerId, node2.multiaddrs)

// await node1.dial(node2.peerId)

// Wait for onConnect handlers in the DHT
// await delay(1000)

// const peer = await node1.peerRouting.findPeer(node3.peerId)
// console.log(peer)

// const bytes = new TextEncoder('utf8').encode('OMG!')

// const hash = await multihashing(key, 'sha2-256')
// const cid = new CID(1, 'dag-pb', hash)

// await node1.contentRouting.provide(cid)

// wait for propagation
// await delay(300)

// const providers = await all(node3.contentRouting.findProviders(cid, { timeout: 3000 }))

// console.log(uint8ArrayToString(await node3.contentRouting.get(key)))