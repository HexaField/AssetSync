import test from 'ava'

import createLibp2p from './dht/create-libp2p.js'
import Peer from './dht/peer.js'
import delay from 'delay'
// import CID from 'cids'
// import all from 'it-all'
// import multihashing from 'multihashing-async'

async function createPeers() {

    const peers = []
    const peerCount = 2
    
    for (let i = 0; i < peerCount; i++) {
        const peer = new Peer(await createLibp2p())
        await peer.start()
        peers.push(peer)
    }

    return peers
}

const peers = await createPeers()

// skipped until dht implemented
test.serial.skip('can put and get to DHT', async (t) => {

    t.timeout(60 * 1000)

    const key = Math.random().toString(36)
    const val = Math.random().toString(36)
    
    return new Promise((resolve) => {

        peers[0].libp2pPlugin.on('peer:connect', async (connection) => {
            await peers[0].dhtPlugin.put(key, val)
        })

        peers[1].dhtPlugin.on('dht:add', (entry) => console.log(entry.key, entry.value))

        peers[1].libp2pPlugin.on('peer:connect', async (connection) => {
            // await delay(500) // wait for entry to propagate
            // const result = await peers[1].dhtPlugin.get(key)
            // await delay(10000)
            // resolve(result)
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