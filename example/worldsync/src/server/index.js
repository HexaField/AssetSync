import { isWebWorker } from '@AssetSync/common'
import { server } from '@AssetSync/WorldSync'

export async function runApp() {

    console.log('Starting server...')
    const { default: game } = await import('./game/index.js')
    server(game)

    // server stuff    
}
if(isWebWorker)
    runApp()