import AssetSync, {
    
    Libp2pPlugin,
    NetworkPlugin,
    // RemoteNetworkPlugin,
    DHTPlugin,
    // RemoteDHTPlugin,
    // StoragePlugin,
    // ConnectionPlugin

} from '@AssetSync/AssetSync'

import { homedir, isNode, getParams } from '@AssetSync/common'
import libp2p from './create-libp2p/index.js'

// args = { }

export async function startAssetSync({ repoPath }) {

    let assetSync = new AssetSync()
    let networkPlugin, dhtPlugin
    const minPeers = 1

    const libp2pInstance = await libp2p({ repoPath: repoPath || (homedir() + '.conjure-repo') })
    
    const transportPlugin = new Libp2pPlugin({ libp2p: libp2pInstance, minPeersCount: isNode ? 0 : (getParams().network === 'true' ? minPeers : 0) })
    await assetSync.register({ transportPlugin })
    networkPlugin = new NetworkPlugin({ transportPlugin })
    let dhtConstructor
    if(isNode) {
        const { default: dht } = await import('libp2p-kad-dht')
        dhtConstructor = dht
    } else {
        dhtConstructor = window.Libp2pKadDht
    }
    dhtPlugin = new DHTPlugin({ transportPlugin, dhtConstructor })
    
    await assetSync.register({ networkPlugin, dhtPlugin })
    await assetSync.initialise()

    return assetSync
}


// todo: dynamic imports