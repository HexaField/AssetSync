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


export { Server } from './server/index.js'
export { Client } from './client/index.js'

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

        this._socketSync = new SocketSync()

        if (isNode) { 

            this._server = args.serverFunc(false, this._socketSync)
            await this._socketSync.initialise()

        } else {

            this._connectedToNode = !await this._socketSync.initialise()
            //  await new Promise((resolve) => {
            //     const sock = new WebSocket('ws://localhost:' + (args.websocketPort || '19843'))
            //     sock.onopen = () => {
            //         console.log('Found server!')
            //         sock.close(1000)
            //         resolve(true)
            //     }
            //     sock.onerror = (error) => resolve(false)
            //     sock.onclose = (error) => resolve(false)
            // })
            
            if(this._connectedToNode) {
                
                console.log('Found local node, starting server interface...')
                this._server = args.serverFunc(true, this._socketSync)

            } else {

                if(window.Worker) {

                    this._worker = createWorker(args.serverFile)

                    this._networkPlugin = await this._startNetworkPluginForRemoteLibp2p(this._worker)

                    this._worker.start(args.canvas)
                    
                } else {
                    console.log('ERROR: browser does not support WebWorker')
                    this._server = args.serverFunc(false, this._socketSync)
                }

            }

            this._client = args.client()
        }

    }

    async _startNetworkPluginForRemoteLibp2p(remoteHandler) {

        const assetSync = new AssetSync()
        const transportPlugin = new Libp2pPlugin({ libp2p })
        const networkPlugin = new NetworkPlugin({ 
            transportPlugin,
            networkEvents: {
                onPeerJoin: (networkID, peerID) => { 
                    remoteHandler.sendEvent('networkEvent-'+networkID, ['onPeerJoin', peerID])
                },
                onPeerLeave: (networkID, peerID) => { 
                    remoteHandler.sendEvent('networkEvent-'+networkID, ['onPeerLeave', peerID])
                },
                onMessage: (networkID, data, from) => { 
                    remoteHandler.sendEvent('networkEvent-'+networkID, ['onMessage', data, from])
                }
            }
        })

        await assetSync.registerPlugin(transportPlugin)
        await assetSync.registerPlugin(networkPlugin)
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