import { isWebWorker } from '@AssetSync/common'
import { receiveWorker } from '@AssetSync/WorkerSync'
import { startAssetSync } from './create-assetsync.js'


export class Server {

    constructor() {
        
        this.start = this.start.bind(this)
        if(isWebWorker)
            receiveWorker(this.start)
        else
            this.start()
    }

    /**
     * 
     * args = { canvas, inputElement, userData }
     * 
    */
    
    async start(args = {}) {
        
        this._assetSync = await startAssetSync({ proxy: args.inputElement })

        return this
    }

}