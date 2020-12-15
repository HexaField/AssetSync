import kad from './kad/index.min.js'
import Libp2pRepo from './libp2p-repo/dist/index.min.js'
window.Libp2pRepo = Libp2pRepo

export function config() {
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
            dht: kad
        },
        config: {
            dht: {
                protocolPrefix: '/conjure',
                kBucketSize: 20,
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

    const node = await self.Libp2p.create(options || config())
    await node.start()
    return node
}