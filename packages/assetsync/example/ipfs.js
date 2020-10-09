import WebrtcStar from 'libp2p-webrtc-star'
import WS from 'libp2p-websockets'
import TCP from 'libp2p-tcp'
// import Bootstrap from 'libp2p-bootstrap'
import Gossipsub from 'libp2p-gossipsub'
import KadDHT from 'libp2p-kad-dht'
import MPLEX from 'libp2p-mplex'
import SECIO from 'libp2p-secio'
import { NOISE } from 'libp2p-noise'
import wrtc from 'wrtc'

import { homedir } from '../src/utils'

export default {
    repo: homedir() + '/.ipfs',
    config: {
        Addresses: {
            Swarm: ['/dns4/boiling-hamlet-91904.herokuapp.com/tcp/443/wss/p2p-webrtc-star'],
            API: '',
            Gateway: '',
            Delegates: []
        },
        Bootstrap: []
    },
    libp2p: {
        modules: {
            transport: [
                TCP,
                WebrtcStar,
                WS
            ],
            streamMuxer: [MPLEX],
            connEncryption: [NOISE, SECIO],
            // peerDiscovery: [Bootstrap],
            dht: KadDHT,
            pubsub: Gossipsub
        },
        config: {
            transport: {
                [WebrtcStar.prototype[Symbol.toStringTag]]: {
                    wrtc
                }
            },
            dht: {
                enabled: true,
                // randomWalk: {
                //     enabled: true,
                // }
            },
        }
    }
}