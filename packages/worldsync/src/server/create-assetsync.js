
import AssetSync, { 
    RemoteNetworkPlugin,
    Libp2pPlugin,
    NetworkPlugin,
    StoragePlugin
} from '@AssetSync/AssetSync'

import { isBrowser, isNode, isWebWorker, libp2p } from '@AssetSync/common'

// args = { }

export async function startAssetSync(args = {}) {
    
    let assetSync = new AssetSync()
    let networkPlugin

    if(isWebWorker) {
        networkPlugin = new RemoteNetworkPlugin()
        networkPlugin.setTarget(args.proxy)
    } else {
        const libp2pPlugin = await assetSync.registerPlugin(new Libp2pPlugin({ libp2p }))
        networkPlugin = new NetworkPlugin({ libp2pPlugin })
    }
    const storagePlugin = new StoragePlugin()

    // ------- //

    await assetSync.registerPlugin(networkPlugin)
    await assetSync.registerPlugin(storagePlugin)
    await assetSync.initialise()

    // ------- //
    
    const network = await networkPlugin.joinNetwork('test-network-worldsync')
    network.on('onMessage', (message, peerID) => {
        console.log(peerID, 'says', message)
    })
    network.on('onPeerJoin', (peerID) => {
        console.log(peerID, 'has joined')
        networkPlugin.sendTo('test-network-worldsync', '', 'Hello peer!', peerID)
    })
    network.on('onPeerLeave', (peerID) => {
        console.log(peerID, 'has left')
    })

    return assetSync
}