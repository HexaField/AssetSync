import createLibp2p from './utils/create-libp2p.js'
import Libp2p from 'libp2p'
import { Peer } from './peer.js'

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

    const node1 = await createLibp2p()
    const node2 = await createLibp2p(node1)

    const peer1 = await Peer(node1)
    const peer2 = await Peer(node2)
}
runTest()