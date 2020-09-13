const IPFS = require('./IPFSConfig')
const AssetSync = require('../src')

const ipfs = IPFS()
const myDatabase = AssetSync(ipfs)

