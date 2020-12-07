import AssetSync, {
    
    Libp2pPlugin,
    NetworkPlugin,
    RemoteNetworkPlugin,
    DHTPlugin,
    RemoteDHTPlugin,
    StoragePlugin,
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
        let dhtConstructor
        if(isNode) {
            const { default: dht } = await import('../../../common/src/libp2p-template/libp2pkaddht/node/src/index.js')
            dhtConstructor = dht
        } else {
            const { default: dht } = await import('../../../common/src/libp2p-template/libp2pkaddht/index.min.js')
            dhtConstructor = dht
        }
        dhtPlugin = new DHTPlugin({ transportPlugin, dhtConstructor })
        connectionPlugin = new ConnectionPlugin()
    }

    const storagePlugin = new StoragePlugin()
    // const syncedDatabasePlugin = new SyncedDatabasePlugin({ networkPlugin })

    await assetSync.register({ networkPlugin, dhtPlugin, storagePlugin, connectionPlugin })
    await assetSync.initialise()

    return assetSync
}


// todo: dynamic imports