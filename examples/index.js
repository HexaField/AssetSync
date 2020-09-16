const IPFS = require('./IPFSConfig')
const AssetSync = require('../src')

const ipfs = IPFS([
    '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
    '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star'
])
const myDatabase = AssetSync(ipfs)

