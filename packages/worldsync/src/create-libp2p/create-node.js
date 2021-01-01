import Libp2p from 'libp2p'
import WebSockets from 'libp2p-websockets'
import filters from 'libp2p-websockets/src/filters.js'
import WebrtcStar from 'libp2p-webrtc-star'
import TCP from 'libp2p-tcp'
import Multiplex from 'libp2p-mplex'
// import SECIO from 'libp2p-secio'
import { NOISE } from 'libp2p-noise'
import GossipSub from 'libp2p-gossipsub'
import KadDHT from 'libp2p-kad-dht'
// import KadDHT from '../../../../common/src/libp2pkaddht/src/index.js'
import wrtc from 'wrtc'
import dhtConfig from './dhtConfig.js'

export function defaultNodeConfig() {
    return {
        addresses: {
            listen: [
                '/dns4/boiling-hamlet-91904.herokuapp.com/tcp/443/wss/p2p-webrtc-star', // this uses socket.io V2
                // '/dns4/floating-retreat-57828.herokuapp.com/tcp/443/wss/p2p-webrtc-star/' // this uses a socket.io V3
                // '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
                // '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star'
            ]
        },
        modules: {
            transport: [
                TCP, WebSockets, WebrtcStar
            ],
            streamMuxer: [
                Multiplex
            ],
            connEncryption: [
                NOISE,
                // SECIO
            ],
            dht: KadDHT,
            pubsub: GossipSub
        },
        config: {
            transport: {
                [WebrtcStar.prototype[Symbol.toStringTag]]: {
                    wrtc
                },
                [WebSockets.prototype[Symbol.toStringTag]]: {
                    filter: filters.all
                }
            },
            dht: dhtConfig,
            exposeRawConn: true
        }
    }
}

// todo: add custom config options

export default async function (options) {
    const node = await Libp2p.create(options || defaultNodeConfig())
    await node.start()
    return node
}