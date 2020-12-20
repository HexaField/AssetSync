// import kad from './kad/index.min.js'
import Libp2pRepo from './libp2p-repo/dist/index.min.js'
window.Libp2pRepo = Libp2pRepo
import dhtConfig from './dhtConfig.js'

export function defaultBrowserConfig() {
    return {
        addresses: {
            listen: [
                '/dns4/floating-retreat-57828.herokuapp.com/tcp/443/wss/p2p-webrtc-star/',
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
                // window.Libp2pNoise,
                window.Libp2pSecio
            ],
            pubsub: window.Libp2pGossipsub,
            dht: window.Libp2pKadDht
        },
        config: {
            dht: dhtConfig
        }
    }
}
// todo: add custom config options

export default async function (options) {

    const node = await self.Libp2p.create(options || defaultBrowserConfig())
    await node.start()
    return node
}