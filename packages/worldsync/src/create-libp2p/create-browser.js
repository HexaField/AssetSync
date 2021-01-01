// import kad from './kad/index.min.js'
import Libp2pRepo from './libp2p-repo/dist/index.min.js'
window.Libp2pRepo = Libp2pRepo
import dhtConfig from './dhtConfig.js'
import Libp2p from './libp2p.min.js'
window.Libp2p = Libp2p

export function defaultBrowserConfig() {
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
                window.Libp2pWebsockets,
                window.Libp2pWebrtcStar
            ],
            streamMuxer: [
                window.Libp2pMplex
            ],
            connEncryption: [
                window.Libp2pNoise.NOISE,
                // window.Libp2pSecio
            ],
            pubsub: window.Libp2pGossipsub,
            dht: window.Libp2pKadDht
        },
        config: {
            dht: dhtConfig,
            exposeRawConn: true
        }
    }
}
// todo: add custom config options

export default async function (options) {

    const node = await window.Libp2p.create(options || defaultBrowserConfig())
    await node.start()
    return node
}