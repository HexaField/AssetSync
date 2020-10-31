import test from 'ava'
import createLibp2p from './dht/create-libp2p.js'
import Peer from './dht/peer.js'

import delay from 'delay'
// import CID from 'cids'
// import all from 'it-all'
// import multihashing from 'multihashing-async'
const peers = []
const peerCount = 2

for (let i = 0; i < peerCount; i++) {
    const peer = new Peer(await createLibp2p())
    await peer.start()
    peers.push(peer)
}

const key = '/' + Math.random().toString(36)
const val = Math.random().toString(36)

test('can put and get to DHT', t => {
    return new Promise((resolve) => {

        peers[0].libp2pPlugin.getTransport().connectionManager.on('peer:connect', async (connection) => {
            await peers[1].dhtPlugin.put(key, val)
        })

        peers[1].libp2pPlugin.getTransport().connectionManager.on('peer:connect', async (connection) => {
            await delay(250) // wait for entry to propagate
            resolve(await peers[1].dhtPlugin.get(key))
        })

    }).then((result) => {
        t.is(result, val)
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