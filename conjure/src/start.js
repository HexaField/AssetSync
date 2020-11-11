import { isWebWorker } from '@AssetSync/common'
import { server } from '@AssetSync/WorldSync'

if(isWebWorker)
    runWorker()

async function runWorker() {

    console.log('Starting server...')
    const { default: app } = await import('./app/index.js')
    server(app)

    // server stuff    
}

export async function runApp(worldSync) {

    console.log('Starting server...')
    const { default: app } = await import('./app/index.js')
    server(app, worldSync)

    // server stuff    
}