import { server } from '@AssetSync/WorldSync'
import app from './app/index.js'

async function startApp() {
    console.log('Starting server...')
    server(app)
}
startApp()

