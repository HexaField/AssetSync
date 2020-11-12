import AssetSync, {
    
    Libp2pPlugin,
    NetworkPlugin,
    RemoteNetworkPlugin,
    DHTPlugin,
    RemoteDHTPlugin,
    StoragePlugin,
    SyncedDatabasePlugin,
    ConnectionPlugin

} from '@AssetSync/AssetSync'

import { isBrowser, isNode, isWebWorker, libp2p } from '@AssetSync/common'

// args = { }

export async function startAssetSync(proxy) {

    let assetSync = new AssetSync()
    let networkPlugin, dhtPlugin, connectionPlugin

    if (isWebWorker && proxy) {

        networkPlugin = new RemoteNetworkPlugin()
        networkPlugin.setTarget(proxy)
        dhtPlugin = new RemoteDHTPlugin()
        dhtPlugin.setTarget(proxy)
        // connectoio proxy

    } else {

        const transportPlugin = new Libp2pPlugin({ libp2p, minPeersCount: 0 })
        await assetSync.register({ transportPlugin })
        networkPlugin = new NetworkPlugin({ transportPlugin })
        dhtPlugin = new DHTPlugin({ transportPlugin })
        connectionPlugin = new ConnectionPlugin()
    }

    const storagePlugin = new StoragePlugin()
    const syncedDatabasePlugin = new SyncedDatabasePlugin({ networkPlugin })

    await assetSync.register({ networkPlugin, dhtPlugin, storagePlugin, syncedDatabasePlugin, connectionPlugin })
    await assetSync.initialise()

    return assetSync
}


// todo: dynamic imports