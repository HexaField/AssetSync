import Libp2p from 'libp2p'
import WebSockets from 'libp2p-websockets'
import filters from 'libp2p-websockets/src/filters.js'
import TCP from 'libp2p-tcp'
import Multiplex from 'libp2p-mplex'
import { NOISE } from 'libp2p-noise'
import KadDHT from 'libp2p-kad-dht'
// import KadDHT from '../../../common/src/libp2pkaddht/src/index.js'
import GossipSub from 'libp2p-gossipsub'
import WebrtcStar from 'libp2p-webrtc-star'
import wrtc from 'wrtc'

export default async function (protocol) {
    const node = await Libp2p.create({
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
                NOISE
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
                    filters: filters.all
                }
            },
            dht: {
                protocolPrefix: protocol,
                kBucketSize: 10,
                enabled: true,
                randomWalk: {
                    enabled: false,
                    interval: 300e3,
                    timeout: 10e3
                }
            }
        }
    })
    node.start()
    
    return node
}