import createNode from './libp2p/index.js'

import delay from 'delay'
import CID from 'cids'
import all from 'it-all'
import multihashing from 'multihashing-async'

import uint8ArrayFromString from 'uint8arrays/from-string.js'
import uint8ArrayToString from 'uint8arrays/to-string.js'

export default async function () {
    const [node1, node2] = await Promise.all([
        createNode(),
        createNode()
    ])

    const key = uint8ArrayFromString('/key')
    const val = uint8ArrayFromString('my value')

    node1.connectionManager.on('peer:connect', async (connection) => {
        console.log('node1 Connection established to:', connection.remotePeer.toB58String())	// Emitted when a new connection has been created
        await node1.contentRouting.put(key, val)
        // console.log(uint8ArrayToString(await node1.contentRouting.get(key)))
    })

    node2.connectionManager.on('peer:connect', async (connection) => {
        console.log('node2 Connection established to:', connection.remotePeer.toB58String())	// Emitted when a new connection has been created
        await delay(300)
        console.log(uint8ArrayToString(await node2.contentRouting.get(key)))
    })


    node1.on('peer:discovery', (peerId) => {
        // No need to dial, autoDial is on
        console.log('Discovered:', peerId.toB58String())
    })

    node2.on('peer:discovery', (peerId) => {
        // No need to dial, autoDial is on
        console.log('Discovered:', peerId.toB58String())
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
}