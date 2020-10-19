import { isWebWorker } from '@AssetSync/common'
import { server } from '@AssetSync/WorldSync'

export async function runApp(worldSync) {

    console.log('Starting server...')
    const { default: game } = await import('./game/index.js')
    server(game, worldSync)

    // server stuff    
}
if(isWebWorker)
    runApp()