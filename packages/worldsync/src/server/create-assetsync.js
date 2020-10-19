
import AssetSync, { 
    RemoteNetworkPlugin,
    Libp2pPlugin,
    NetworkPlugin,
    StoragePlugin
} from '@AssetSync/AssetSync'

import { isBrowser, isNode, isWebWorker, libp2p } from '@AssetSync/common'

// args = { }

export async function startAssetSync(proxy) {
    
    let assetSync = new AssetSync()
    let networkPlugin

    if(isWebWorker) {
        networkPlugin = new RemoteNetworkPlugin()
        networkPlugin.setTarget(proxy)
    } else {
        const transportPlugin = new Libp2pPlugin({ libp2p, minPeersCount: 0 })
        networkPlugin = new NetworkPlugin({ transportPlugin })
        await assetSync.register({ transportPlugin })
    }
    const storagePlugin = new StoragePlugin()

    await assetSync.register({ networkPlugin, storagePlugin })
    await assetSync.initialise()

    return assetSync
}