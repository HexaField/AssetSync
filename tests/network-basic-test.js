const Network = require('../src_old/Network')
const createLibp2p = require('./utils/create-libp2p')
const Libp2p = require('libp2p')

const topic = 'topic-' + Math.round(Math.random() * 10000000)

async function runTest() {

    const defaultConfig = await createLibp2p.config(true)

    const relay = new Libp2p({
      ...defaultConfig,
      addresses: {
        listen: ['/ip4/127.0.0.1/tcp/24642/ws'],
      },
      config: {
        ...defaultConfig.config,
        relay: {
          enabled: true,
          hop: {
            enabled: true
          }
        }
      }
    })

    await relay.start()

    const PROTOCOLS_TEST = {
        HELLO: 'PROTOCOLS_TEST.HELLO'
    }

    const node1 = await createLibp2p()
    const id1 = node1.peerId.toB58String()

    const node2 = await createLibp2p(node1)
    const id2 = node2.peerId.toB58String()

    let network1, network2

    network1 = new Network(
        node1,
        id1,
        topic,
        (message, from) => {
            console.log('Received message ' + message.content + ' using protocol ' + message.protocol + ' from ' + from)
        },
        (peer) => {
            console.log('Peer ' + peer + ' has joined.')
            network1.sendTo(PROTOCOLS_TEST.HELLO, 'Hello!', peer)
        },
        (peer) => {
            console.log('Peer ' + peer + ' has left.')
        },
    )

    network2 = new Network(
        node2,
        id2,
        topic,
        (message, from) => {
            console.log('Received message ' + message.content + ' using protocol ' + message.protocol + ' from ' + from)
            network1.leave()
        },
        (peer) => {
            console.log('Peer ' + peer + ' has joined.')
        },
        (peer) => {
            console.log('Peer ' + peer + ' has left.')
            network1.leave()
            relay.stop()
            process.exit(0)
        },
    )
    
}
runTest()