/*

notes:
 - PeerSync does not ever directly interact with AssetSync,
    - it only operates as pipe between client and server
    - only the server talks to AssetSync

entrypoint:
- PeerSync must be the first thing initiated to either set up websocket server
    or try and connect to existing websocket server

- Then figure out the current context - browser/node & slave/master

master: 

- AssetSync must be next, as it handles all storage, security, networking and payments
    but is managed externally for flexibility

- run server
- if not headless, run client

slave:

- run client


// ============= //

inital config {
    AssetSync, // func
    headless, // bool
    server, // func
    client // func
}

*/

import AssetSync, { NetworkPlugin, Libp2pPlugin } from '@AssetSync/AssetSync'
import { isBrowser, isNode, libp2p } from '@AssetSync/common'
import { createWorker } from '@AssetSync/WorkerSync'
import SocketSync from '@AssetSync/SocketSync'


export { server } from './server/index.js'
export { client } from './client/index.js'

export default async function createWorldSync(args = {}) {
    const worldsync = new WorldSync()
    await worldsync.start(args)
    return worldsync
}

class WorldSync {

    constructor() {
        this._connectedToNode = false
    }

    async start(args = {}) {

        if (isNode) { 

            // start a local server
            this._peerSync = new SocketSync()    
            this._peerSync.initialiseServer()
            this._server = args.serverFunc(this)

        } else {

            // try and find a local node to offload the server
            this._peerSync = new SocketSync()
            this._connectedToNode = await this._peerSync.initialiseClient()
            
            if(this._connectedToNode) {
                
                console.log('Found local node, starting server interface...')
                // this._server = args.serverFunc(this) // we shouldn't need to run the server at all if its running on an external node

            } else {

                if(window.Worker) {
                    // override socketsync with worker since we're running everything in the browser
                    // starts the server in a worker from the specified file
                    this._peerSync = createWorker(args.serverFile)
                    this._networkPlugin = await this._startNetworkPluginForRemoteLibp2p(this._peerSync)
                    this._peerSync.start(args.canvas)
                    
                } else {
                    console.log('ERROR: browser does not support WebWorker')
                    this._server = args.serverFunc(this)
                }

            }

            this._client = args.client(this)
        }

    }

    async _startNetworkPluginForRemoteLibp2p(remoteHandler) {

        const assetSync = new AssetSync()
        const transportPlugin = new Libp2pPlugin({ libp2p })
        const networkPlugin = new NetworkPlugin({ 
            transportPlugin,
            networkEvents: {
                onPeerJoin: (networkID, peerID) => { 
                    remoteHandler.sendEvent({ type: 'networkEvent-'+networkID, data: ['onPeerJoin', peerID] })
                },
                onPeerLeave: (networkID, peerID) => { 
                    remoteHandler.sendEvent({ type: 'networkEvent-'+networkID, data: ['onPeerLeave', peerID] })
                },
                onMessage: (networkID, data, from) => { 
                    remoteHandler.sendEvent({ type: 'networkEvent-'+networkID, data: ['onMessage', data, from] })
                }
            }
        })

        await assetSync.register({ transportPlugin, networkPlugin })
        await assetSync.initialise()

        remoteHandler.addRequestOpcodes({
            leaveAllNetworks: networkPlugin.leaveAllNetworks.bind(networkPlugin),
            leaveAllClientNetworks: networkPlugin.leaveAllClientNetworks.bind(networkPlugin),
            joinNetwork: networkPlugin.joinNetwork.bind(networkPlugin),
            leaveNetwork: networkPlugin.leaveNetwork.bind(networkPlugin),
            sendTo: networkPlugin.sendTo.bind(networkPlugin),
            sendData: networkPlugin.sendData.bind(networkPlugin),
            getPeers: networkPlugin.getPeers.bind(networkPlugin)
        })

        return networkPlugin
    }

}