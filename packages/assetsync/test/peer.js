import DataHandler from '../src/index.js'
import { WebsocketPlugin } from '../src/plugins/websocket/index.js'
import { Libp2pPlugin} from '../src/plugins/libp2p/index.js'
import { NetworkPlugin } from '../src/plugins/network/index.js'
import { StoragePlugin } from '../src/plugins/storage/index.js'

export async function Peer(libp2p) {

    const dataHandler = new DataHandler()

    const websocketPlugin = new WebsocketPlugin()
    const libp2pPlugin = new Libp2pPlugin({ libp2p })
    const networkPlugin = new NetworkPlugin({ libp2pPlugin })
    const storagePlugin = new StoragePlugin()

    await dataHandler.registerPlugin(websocketPlugin)
    await dataHandler.registerPlugin(libp2pPlugin)
    await dataHandler.registerPlugin(networkPlugin)
    await dataHandler.registerPlugin(storagePlugin)
    
    await dataHandler.initialise()

    // ------- //

    await networkPlugin.joinNetwork(
        '/conjure/global', // take a peer under the hood of conjure.world
        (message, peerID) => console.log('onMessage', message, peerID),
        (peerID) => console.log('onPeerJoin', peerID),
        (peerID) => console.log('onPeerLeave', peerID)
    )
}