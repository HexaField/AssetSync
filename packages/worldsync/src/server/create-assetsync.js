import AssetSync, {
    
    Libp2pPlugin,
    NetworkPlugin,
    RemoteNetworkPlugin,
    DHTPlugin,
    RemoteDHTPlugin,
    StoragePlugin,
    ConnectionPlugin

} from '@AssetSync/AssetSync'

import { homedir, isBrowser, isNode, isWebWorker } from '@AssetSync/common'
import libp2p from './create-libp2p/index.js'

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


        const libp2pInstance = await libp2p({ repoPath: homedir() + '.conjure-repo' })
        
        const transportPlugin = new Libp2pPlugin({ libp2p: libp2pInstance, minPeersCount: 0 })
        await assetSync.register({ transportPlugin })
        networkPlugin = new NetworkPlugin({ transportPlugin })
        let dhtConstructor
        if(isNode) {
            const { default: dht } = await import('libp2p-kad-dht')
            dhtConstructor = dht
        } else {
            const { default: dht } = await import('../../../common/src/libp2pkaddht/dist/index.min.js')
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