import test from 'ava'
import { relay } from './utils.js'
import Peer from './network/peer.js'
import createLibp2p, { config } from './network/create-libp2p.js'
// import browser from './browser.js'

await relay(config)

const node1 = await createLibp2p()
const peer1ID = node1.peerId.toB58String()

const node2 = await createLibp2p(node1)
const peer2ID = node2.peerId.toB58String()

const networkID = Math.random().toString(36)

const peer1 = new Peer(node1)
await peer1.start(networkID)

const peer2 = new Peer(node2)
await peer2.start(networkID)

test.serial('can find peers', t => {
    return new Promise((resolve) => {
        peer1.on('onPeerJoin', (id) => {
            resolve(id)
        })
    }).then((result) => {
        t.is(result, peer2ID)
    })
})

test.serial('can message peer', t => {

    const content = Math.random().toString(36)

    peer1.network.sendTo(peer2ID, content)
    return new Promise((resolve) => {
        peer2.on('onMessage', (content, peerID) => {
            resolve({ content, peerID })
        })
    }).then((result) => {
        t.is(result.peerID, peer1ID)
        t.is(result.content, content)
    })
})


test.serial('can message all peers', t => {

    const content = Math.random().toString(36)

    peer2.network.broadcast(content)
    return new Promise((resolve) => {
        peer1.on('onMessage', (content, peerID) => {
            resolve({ content, peerID })
        })
    }).then((result) => {
        t.is(result.peerID, peer2ID)
        t.is(result.content, content)
    })
})