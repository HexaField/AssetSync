
import AssetSync, { 
    // Libp2pPlugin,
    // NetworkPlugin,
    StoragePlugin,
    WebsocketPlugin
} from '@AssetSync/AssetSync'
import { isNode } from '@AssetSync/common'
// import libp2p from './create-libp2p.js'
// import { relay } from './test-utils.js'

async function run() {
    // if(isNode)
    //     await relay()

    // ------- //

    const assetSync = new AssetSync()
    const websocketPlugin = new WebsocketPlugin()
    // const libp2pPlugin = new Libp2pPlugin({ libp2p })
    // const networkPlugin = new NetworkPlugin({ libp2pPlugin })
    const storagePlugin = new StoragePlugin()

    // ------- //

    await assetSync.registerPlugin(websocketPlugin)
    // await assetSync.registerPlugin(libp2pPlugin)
    // await assetSync.registerPlugin(networkPlugin)
    await assetSync.registerPlugin(storagePlugin)
    await assetSync.initialise()

    // ------- //

    // await networkPlugin.joinNetwork(networkID)
    // networkPlugin.on('onMessage', console.log)
    // networkPlugin.on('onPeerJoin', console.log)
    // networkPlugin.on('onPeerLeave', console.log)
}
run()