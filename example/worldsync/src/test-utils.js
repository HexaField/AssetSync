import { config } from './create-libp2p.js'
import Libp2p from 'libp2p'

export async function relay() {

    const defaultConfig = await config(true)

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

}