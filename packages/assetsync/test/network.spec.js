import test from 'ava'
import { relay } from './network/test-utils.js'
import Peer from './network/peer.js'
import createLibp2p from './network/create-libp2p.js'
// import browser from './browser.js'

await relay()

const node1 = await createLibp2p()
const peer1ID = node1.peerId.toB58String()

const node2 = await createLibp2p(node1)
const peer2ID = node2.peerId.toB58String()

const networkID = Math.random().toString(36)

const peer1 = new Peer(node1)
await peer1.start(networkID)

const peer2 = new Peer(node2)
await peer2.start(networkID)

// test('Browser: peer 1 finds peer 2', browser, t => {
//     return new Promise((resolve) => {
//         peer1.on('onPeerJoin', (id) => {
//             resolve(id)
//         })
//     }).then((result) => {
//         t.is(result, peer2ID)
//     })
// })

// test('Browser: peer 2 finds peer 1', browser, t => {
//     return new Promise((resolve) => {
//         peer2.on('onPeerJoin', (id) => {
//             resolve(id)
//         })
//     }).then((result) => {
//         t.is(result, peer1ID)
//     })
// })

test('Node: peer 1 finds peer 2', t => {
    return new Promise((resolve) => {
        peer1.on('onPeerJoin', (id) => {
            resolve(id)
        })
    }).then((result) => {
        t.is(result, peer2ID)
    })
})

test('Node: peer 2 finds peer 1', t => {
    return new Promise((resolve) => {
        peer2.on('onPeerJoin', (id) => {
            resolve(id)
        })
    }).then((result) => {
        t.is(result, peer1ID)
    })
})

/*
describe('libp2p plugin', function () {
describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
    assert.equal([1, 2, 3].indexOf(4), -1);
    });
});
});*/