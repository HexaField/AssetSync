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
import { isBrowser, isNode } from '@AssetSync/common'
import { createWorker } from '@AssetSync/WorkerSync'
import SocketSync from '@AssetSync/SocketSync'
import libp2p from './server/create-libp2p/index.js'

// export * from './server/world/index.js'


export { server } from './server/index.js'
// export { client } from './client/index.js'

export default async function createWorldSync(args = {}) {
    const worldsync = new WorldSync()
    await worldsync.start(args)
    window.worldSync = worldsync
    window.peerSync = worldsync._peerSync
    return worldsync
}

class WorldSync {

    constructor() {
        this._connectedToNode = false
        this._isRunningInWorker = false
    }

    async start(args = {}) {

        if (isNode) { 

            // start a local server
            // this._peerSync = new SocketSync()    
            // this._peerSync.initialiseServer()
            this._server = args.serverFunc(this)

        } else {

            // try and find a local node to offload the server
            // this._peerSync = new SocketSync()
            // this._connectedToNode = await this._peerSync.initialiseClient()
            
            // if(this._connectedToNode) {
                
            //     console.log('Found local node, starting server interface...')
            //     // this._server = args.serverFunc(this) // we shouldn't need to run the server at all if its running on an external node

            // } else {

                if(args.serverFile && window.Worker) {
                    // override socketsync with worker since we're running everything in the browser
                    // starts the server in a worker from the specified file
                    this._peerSync = await createWorker(args.serverFile)

                    await new Promise((resolve) => {
                        this._peerSync.addEventListener('init', resolve)
                    })

                    this._isRunningInWorker = true
                    
                    this._peerSync.sendSize = () => {
                        this._peerSync.sendEvent({
                            type: 'size',
                            width: this._peerSync.canvas.clientWidth,
                            height: this._peerSync.canvas.clientHeight,
                        })
                    }
                
                    this._peerSync.start = (canvas, config) => {
                        if (canvas.transferControlToOffscreen) { // make sure our browser supports offscreencanvas
                            
                            const offscreen = canvas.transferControlToOffscreen()
                            this._peerSync.canvas = canvas
                            this._peerSync.sendEvent({ 
                                    type: 'start', 
                                    canvas: offscreen, 
                                    devicePixelRatio: window.devicePixelRatio, 
                                    width: window.innerWidth,
                                    height: window.innerHeight,
                                    config
                                },
                                [offscreen]
                            )
                            this._peerSync.sendSize()
                            window.addEventListener('resize', this._peerSync.sendSize)
                
                            this._peerSync.addEventListener('addEventListener', (event) => {
                                window.addEventListener(event.event, this._peerSync.onEvent)
                            })
                
                            this._peerSync.addEventListener('removeEventListener', (event) => {
                                window.removeEventListener(event.event, this._peerSync.onEvent)
                            })
                        }
                    }

                    if(args.config && args.config.assetSync) {
                        this._networkPlugin = await this._startNetworkPluginForRemoteLibp2p(this._peerSync)
                    }
                    this._peerSync.start(args.canvas, args.config)
                    
                } else {
                    // console.log('ERROR: browser does not support WebWorker')
                    this._server = args.serverFunc(this)
                    this.canvas = args.canvas
                    this.config = args.config
                    
                    this.clientWidth = canvas.clientWidth
                    this.clientHeight = canvas.clientHeight

                    window.addEventListener('resize', (event) => {
                        this.clientWidth = canvas.clientWidth
                        this.clientHeight = canvas.clientHeight
                    })

                    this.addEventListener = (event, listener) => {
                        canvas.addEventListener(event, listener)
                    }
                    
                    this.removeEventListener = (event, listener) => {
                        canvas.removeEventListener(event, listener)
                    }
                }

            // }

            // if(args.client)
            //     this._client = args.client(this)
        }

    }

    async _startNetworkPluginForRemoteLibp2p(remoteHandler) {

        const assetSync = new AssetSync()
        const transportPlugin = new Libp2pPlugin({ libp2p })
        const dhtPlugin = new DHTPlugin({ transportPlugin })
        dhtPlugin.on('dht:added', (...args) => {
            remoteHandler.sendEvent({ type: 'dhtEvent', data: ['dht:added', ...args] })
        })
        dhtPlugin.on('dht:changed', (...args) => {
            remoteHandler.sendEvent({ type: 'dhtEvent', data: ['dht:changed', ...args] })
        })
        dhtPlugin.on('dht:removed', (...args) => {
            remoteHandler.sendEvent({ type: 'dhtEvent', data: ['dht:removed', ...args] })
        })
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
                    remoteHandler.sendEvent({ type: 'networkEvent-'+networkID, data: ['onMessage', data.opcode, data.content, from] })
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