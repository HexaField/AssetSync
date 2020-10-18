import { isWebWorker } from '@AssetSync/common'
import { Server } from '@AssetSync/WorldSync'

export async function runApp(isSlave, socket) {

    console.log('Starting server...')
    const server = new Server({ isSlave, socket })

    // server stuff    
}
if(isWebWorker)
    runApp()