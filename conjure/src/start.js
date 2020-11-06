import { isWebWorker } from '@AssetSync/common'
import { server } from '@AssetSync/WorldSync'

export async function runApp() {

    console.log('Starting server...')
    const { default: conjure } = await import('./conjure/index.js')
    server(conjure)

    // server stuff    
}
if(isWebWorker)
    runApp()