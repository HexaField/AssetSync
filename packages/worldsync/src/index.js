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

const BASE_OPTIONS = {
    enableLogging: true
}

import { isBrowser, isNode, isWebWorker } from '@AssetSync/common'
import PeerSync from '@AssetSync/PeerSync'
import { createOffscreenCanvas } from '@AssetSync/WorkerSync'

// assetSync = file to run in worker
// options = {
//     
// }

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

        if (isBrowser) {

            this._connectedToNode = await new Promise((resolve) => {
                const sock = new WebSocket('ws://localhost:' + (args.websocketPort || '19843'))
                sock.onopen = () => {
                    console.log('Found server!')
                    sock.close(1000)
                    resolve(true)
                }
                sock.onerror = (error) => resolve(false)
                sock.onclose = (error) => resolve(false)
            })

            console.log('Found node?', this._connectedToNode)
            
            if(!this._connectedToNode) {

                if(window.Worker) {

                    this._worker = createOffscreenCanvas(document.getElementById('transferrablecanvas'), args.serverFile)
                    
                } else {
                    
                }
            }

            // const { default: client } = await import('./client/index.js')
            // this._client = await client()

        } else {

            const server = args.serverFunc()

            // await this._peerSync.initialise(false, websocketPort)
            // this._server = await this._startServer()

        }

    }

}