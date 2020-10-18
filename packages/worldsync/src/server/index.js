import { isBrowser, isWebWorker } from '@AssetSync/common'
import { receiveWorker } from '@AssetSync/WorkerSync'
import { startAssetSync } from './create-assetsync.js'
export class Server {

    constructor(args = {}) {
        if(args.isSlave) {

        }
        else {
            this.start = this.start.bind(this)
            if(isWebWorker)
                receiveWorker(this.start)
            else
               this.start({ peerSync: args.peerSync })
        }
    }

    /**
     * 
     * args = { canvas, inputElement, userData }
     * 
    */
    
    async start(args = {}) {

        this._assetSync = await startAssetSync({ proxy: args.peerSync })

    }

}