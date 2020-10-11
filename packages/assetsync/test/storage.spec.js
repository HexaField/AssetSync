import test from 'ava'
import Peer from './storage/peer.js'

doTest()

async function doTest() {

    let peer1, peer2

    peer1 = new Peer()
    await peer1.start()

    peer2 = new Peer()
    await peer2.start()
}