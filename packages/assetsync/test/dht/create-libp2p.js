import Libp2p from 'libp2p'
import WS from 'libp2p-websockets'
import TCP from 'libp2p-tcp'
import Multiplex from 'libp2p-mplex'
import SECIO from 'libp2p-secio'
import KadDHT from 'libp2p-kad-dht'
// import KadDHT from '../../../common/src/libp2pkaddht/src/index.js'
import GossipSub from 'libp2p-gossipsub'
import WebrtcStar from 'libp2p-webrtc-star'
import wrtc from 'wrtc'

export default async function (protocol) {
    const node = await Libp2p.create({
        addresses: {
            listen: [
                // '/dns4/boiling-hamlet-91904.herokuapp.com/tcp/443/wss/p2p-webrtc-star',
                '/dns4/floating-retreat-57828.herokuapp.com/tcp/443/wss/p2p-webrtc-star/'
                // '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
                // '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star'
            ]
        },
        modules: {
            transport: [
                TCP, WS, WebrtcStar
            ],
            streamMuxer: [
                Multiplex
            ],
            connEncryption: [
                SECIO
            ],
            dht: KadDHT,
            pubsub: GossipSub
        },
        config: {
            transport: {
                [WebrtcStar.prototype[Symbol.toStringTag]]: {
                    wrtc
                }
            },
            dht: {
                protocol,
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