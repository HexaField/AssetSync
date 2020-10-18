import { isWebWorker } from '@AssetSync/common'
import { Server } from '@AssetSync/WorldSync'

export async function runApp(isSlave, peerSync) {

    console.log('Starting server...')
    const server = new Server({ isSlave, peerSync })

    // server stuff    
}
if(isWebWorker)
    runApp()