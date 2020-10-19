import { isWebWorker } from '@AssetSync/common'

export async function config() {
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
            peerDiscovery: [window.Libp2pBootstrap],
            pubsub: window.Libp2pGossipsub
        },
        config: {
            peerDiscovery: {
                bootstrap: {
                    enabled: true,
                    list: [
                        '/dns4/ams-1.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd',
                        '/dns4/lon-1.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3',
                        '/dns4/sfo-3.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM',
                        '/dns4/sgp-1.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu',
                        '/dns4/nyc-1.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm',
                        '/dns4/nyc-2.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64',
                        '/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ',
                        '/ip4/104.236.176.52/tcp/4001/p2p/QmSoLnSGccFuZQJzRadHn95W2CrSFmZuTdDWP8HXaHca9z',
                        '/ip4/104.236.179.241/tcp/4001/p2p/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM',
                        '/ip4/162.243.248.213/tcp/4001/p2p/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm',
                        '/ip4/128.199.219.111/tcp/4001/p2p/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu',
                        '/ip4/104.236.76.40/tcp/4001/p2p/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64',
                        '/ip4/178.62.158.247/tcp/4001/p2p/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd',
                        '/ip4/178.62.61.185/tcp/4001/p2p/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3',
                        '/ip4/104.236.151.122/tcp/4001/p2p/QmSoLju6m7xTh3DuokvT3886QRYqxAzb1kShaanJgW36yx'
                    ]
                },
                pubsub: {
                    enabled: true,
                    emitSelf: true
                }
            }
        }
    }
}
// todo: add custom config options

export default async function (options = {}) {

    // good enough for now
    if (isWebWorker)
        self.window = self

    // dynamic imports here since webworkers can't access DOM scripts
    await import('https://unpkg.com/libp2p@0.29.0/dist/index.min.js')
    await import('https://unpkg.com/libp2p-mplex@0.10.0/dist/index.min.js')
    await import('https://unpkg.com/libp2p-secio@0.13.1/dist/index.min.js')
    // await import('https://unpkg.com/libp2p-noise@2.0.0/dist/index.min.js')
    await import('https://unpkg.com/libp2p-websockets@0.14.0/dist/index.min.js')
    await import('https://unpkg.com/libp2p-bootstrap@0.12.1/dist/index.min.js')
    await import('https://unpkg.com/libp2p-gossipsub@0.6.3/dist/index.min.js')

    await import('https://unpkg.com/libp2p-webrtc-star@0.20.0/dist/index.min.js') // we can't use webrtc in webworker

    const node = await window.Libp2p.create(await config())
    await node.start()
    return node
}