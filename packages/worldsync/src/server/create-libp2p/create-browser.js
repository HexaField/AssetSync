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
                window.Libp2pWebsockets,
                window.Libp2pWebrtcStar
            ],
            streamMuxer: [window.Libp2pMplex],
            connEncryption: [window.Libp2pSecio],
            pubsub: window.Libp2pGossipsub,
            dht: window.Libp2pKadDht
        },
        config: {
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

    // dynamic imports here since webworkers can't access DOM scripts
    await import('https://unpkg.com/libp2p@0.29.0/dist/index.min.js')
    await import('https://unpkg.com/libp2p-mplex@0.10.0/dist/index.min.js')
    await import('https://unpkg.com/libp2p-secio@0.13.1/dist/index.min.js')
    // await import('https://unpkg.com/libp2p-noise@2.0.0/dist/index.min.js')
    await import('https://unpkg.com/libp2p-websockets@0.14.0/dist/index.min.js')
    // await import('https://unpkg.com/libp2p-bootstrap@0.12.1/dist/index.min.js')
    await import('https://unpkg.com/libp2p-gossipsub@0.6.3/dist/index.min.js')
    await import('https://unpkg.com/libp2p-kad-dht@0.20.3/dist/index.min.js')

    await import('https://unpkg.com/libp2p-webrtc-star@0.20.0/dist/index.min.js') // we can't use webrtc in webworker

    const node = await self.Libp2p.create(options || config())
    await node.start()
    return node
}