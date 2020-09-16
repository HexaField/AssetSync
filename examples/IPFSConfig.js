const IPFS = require('ipfs')    
const WebrtcStar = require('libp2p-webrtc-star')
const TCP = require('libp2p-websockets')
const WS = require('libp2p-tcp')
const wrtc = require('wrtc')

async function loadIPFS(rendezvousServers) {
    
    const ipfs = await IPFS.create({
        repo: '.ipfs',
        config: {
            Addresses: { 
                Swarm: [ ...rendezvousServers, ],
                API: '',
                Gateway: '',
                Delegates: []
            },
            Bootstrap: []
        },
        libp2p: {
            modules: {
                transport: [TCP, WebrtcStar, WS],
            },
            config: {
                transport: {
                    [WebrtcStar.prototype[Symbol.toStringTag]]: {
                        wrtc
                    }
                },
            }
        }
    });

    return ipfs
}

module.exports = { loadIPFS }