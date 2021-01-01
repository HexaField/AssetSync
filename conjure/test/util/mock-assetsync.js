
import AssetSync, {
    
    Libp2pPlugin,
    NetworkPlugin,
    DHTPlugin

} from '@AssetSync/AssetSync'

import libp2p from './create-libp2p.js'

export default async function(otherNode) {

    const assetSync = new AssetSync()

    const libp2pInstance = await libp2p(otherNode)
    
    const transportPlugin = new Libp2pPlugin({ libp2p: libp2pInstance, minPeersCount: 0 })
    await assetSync.register({ transportPlugin })

    const networkPlugin = new NetworkPlugin({ transportPlugin })
    await assetSync.register({ networkPlugin })

    const { default: dhtConstructor } = await import('libp2p-kad-dht')
    const dhtPlugin = new DHTPlugin({ transportPlugin, dhtConstructor })
    
    await assetSync.register({ dhtPlugin })
    await assetSync.initialise()

    return assetSync
}