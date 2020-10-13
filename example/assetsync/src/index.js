
import AssetSync, {
    Libp2pPlugin,
    NetworkPlugin,
    StoragePlugin
} from '@AssetSync/AssetSync'
import { isNode } from '@AssetSync/common'

async function run() {

    let libp2p

    if (isNode) {

        const { default: Libp2p } = await import('./create-libp2p.js')
        libp2p = Libp2p

    } else {

        const { default: Libp2p } = await import('./create-libp2p-browser.js')
        libp2p = Libp2p

    }

    // ------- //

    const assetSync = new AssetSync()
    const libp2pPlugin = new Libp2pPlugin({ libp2p })
    const networkPlugin = new NetworkPlugin({ libp2pPlugin })
    const storagePlugin = new StoragePlugin()

    // ------- //

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