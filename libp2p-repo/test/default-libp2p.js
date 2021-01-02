const { isNode } = require('ipfs-utils/src/env')

module.exports = () => {
    if(isNode) return {
        addresses: {
            listen: []
        },
        modules: {
            transport: [require('libp2p-tcp')],
            streamMuxer: [require('libp2p-mplex')],
            connEncryption: [require('libp2p-noise')]
        },
    } 
    return {
        addresses: {
            listen: []
        },
        modules: {
            transport: [require('libp2p-websockets')],
            streamMuxer: [require('libp2p-mplex')],
            connEncryption: [require('libp2p-noise')]
        }
    }
}