import DataHandler from '../src'
import { IPFSPlugin, NetworkPlugin, StoragePlugin } from '../src/plugins'
import ipfsConfig from './ipfs'

const dataHandler = new DataHandler()

const ipfsPlugin = new IPFSPlugin({ ipfsConfig })
const networkPlugin = new NetworkPlugin({ ipfsPlugin })
const storagePlugin = new StoragePlugin()


async function start() {
    await dataHandler.registerPlugin(ipfsPlugin)
    await dataHandler.registerPlugin(networkPlugin)
    await dataHandler.registerPlugin(storagePlugin)

    dataHandler.on('startMaster', () => server(true))
    dataHandler.on('startSlave', () => server(false))
    
    dataHandler.initialise()
}

start()

async function server(master) {

    const isMaster = master
    console.log('Starting server as ' + (isMaster ? 'master' : 'slave'))

    await dataHandler.callProtocolFunction(NetworkPlugin.ASSETSYNC_PLUGIN_PROTOCOLS_NETWORK.NETWORK_JOIN, {
        network: '/conjure/global', // take a peer under the hood of conjure.world
        onMessage: (message, peerID) => console.log('onMessage', message, peerID),
        onPeerJoin: (peerID) => console.log('onPeerJoin', peerID),
        onPeerLeave: (peerID) => console.log('onPeerLeave', peerID),
    })
    
}