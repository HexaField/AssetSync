import { relay } from './network/test-utils.js'
import Peer from './network/peer.js'
import createLibp2p from './network/create-libp2p.js'
import test from 'ava'

let node1, node2
let peer1, peer2
let peer1ID, peer2ID

await relay()

node1 = await createLibp2p()
peer1ID = node1.peerId.toB58String()

node2 = await createLibp2p(node1)
peer2ID = node2.peerId.toB58String()

peer1 = new Peer(node1)
await peer1.start()

peer2 = new Peer(node2)
await peer2.start()


test('node 1 finds node 2', t => {
    return new Promise((resolve) => {
        peer1.on('onPeerJoin', (id) => {
            resolve(id)
        })
    }).then((result) => {
        t.is(result, peer2ID)
    })
})

test('node 2 finds node 1', t => {
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