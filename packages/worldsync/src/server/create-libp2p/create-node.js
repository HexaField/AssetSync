import Libp2p from 'libp2p'
import WS from 'libp2p-websockets'
import WebrtcStar from 'libp2p-webrtc-star'
import TCP from 'libp2p-tcp'
import Multiplex from 'libp2p-mplex'
import SECIO from 'libp2p-secio'
import GossipSub from 'libp2p-gossipsub'
import KadDHT from 'libp2p-kad-dht'
// import KadDHT from '../../../../common/src/libp2pkaddht/src/index.js'
import wrtc from 'wrtc'

export function config() {
    return {
        addresses: {
            listen: [
                '/dns4/boiling-hamlet-91904.herokuapp.com/tcp/443/wss/p2p-webrtc-star',
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
                kBucketSize: 10,
                enabled: true,
                randomWalk: {
                    enabled: true,
                    interval: 300e3,
                    timeout: 10e3
                }
            }
        }
    }
}

// todo: add custom config options

export default async function (options) {
    const node = await Libp2p.create(options || config())
    await node.start()
    return node
}