
import AssetSync, { 
    Libp2pPlugin,
    NetworkPlugin,
    StoragePlugin,
    WebsocketPlugin
} from '@AssetSync/AssetSync'
import { isNode } from '@AssetSync/common'

async function run() {
    
    let libp2p

    if(isNode) {   

        const { default: Libp2p } = await import ('./create-libp2p.js')
        console.log('Starting libp2p...')
        libp2p = await Libp2p()

    } else {

        const { default: Libp2p } = await import ('./create-libp2p-browser.js')
        console.log('Starting libp2p...')
        libp2p = await Libp2p()
    
    }

    console.log('Started libp2p with ID', libp2p.peerId.toB58String())

    
    // libp2p.on('peer:discovery', (peerId) => {
    //   console.log(`Found peer ${peerId.toB58String()}`)
    // })
  
    // libp2p.connectionManager.on('peer:connect', (connection) => {
    //     console.log(`Connected to ${connection.remotePeer.toB58String()}`)
    // })
  
    // libp2p.connectionManager.on('peer:disconnect', (connection) => {
    //     console.log(`Disconnected from ${connection.remotePeer.toB58String()}`)
    // })
  

    // ------- //

    const assetSync = new AssetSync()
    const websocketPlugin = new WebsocketPlugin()
    const libp2pPlugin = new Libp2pPlugin({ libp2p })
    const networkPlugin = new NetworkPlugin({ libp2pPlugin })
    const storagePlugin = new StoragePlugin()

    // ------- //

    await assetSync.registerPlugin(websocketPlugin)
    await assetSync.registerPlugin(libp2pPlugin)
    await assetSync.registerPlugin(networkPlugin)
    await assetSync.registerPlugin(storagePlugin)
    await assetSync.initialise()

    // ------- //
  
    
    await networkPlugin.joinNetwork('test-network')
    networkPlugin.on('onMessage', (message, peerID) => {
        console.log(peerID, 'says', message)
    })
    networkPlugin.on('onPeerJoin', (peerID) => {
        console.log(peerID, 'has joined')
    })
    networkPlugin.on('onPeerLeave', (peerID) => {
        console.log(peerID, 'has left')
    })
}
run()