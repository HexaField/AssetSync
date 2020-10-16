import { isWebWorker } from '@AssetSync/common'
import { Server } from '@AssetSync/WorldSync'

export async function runApp(worldSync) {

    console.log('Starting server...')
    const server = new Server(worldSync)

    // server stuff    
}
if(isWebWorker)
    runApp()