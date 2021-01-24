import { server } from '@AssetSync/WorldSync'
import app from './app/index.js'
import { isNode, getParams } from '@AssetSync/common'

globalThis.useMemory = typeof process !== 'undefined' && process.env && process.env.MEMORY === 'TRUE'

const verbose = getParams().verbose !== undefined
const network = getParams().network === 'true'

async function startApp() {
    console.log('Starting server...')
    server(
        app, 
        { // assetsync args
            minPeersCount: isNode ? 1 : (getParams().network === 'true' ? 1 : 0),
            enableLogging: !(globalThis.useMemory)
        },
        { // app args
            forceNetwork: network,
            verboseOuput: verbose
        }
    )
}
startApp()

