import { isWebWorker } from '@AssetSync/common'
import { server } from '@AssetSync/WorldSync'

export async function runApp() {

    console.log('Starting server...')
    const { default: app } = await import('./app/index.js')
    server(app)

    // server stuff    
}
if(isWebWorker)
    runApp()