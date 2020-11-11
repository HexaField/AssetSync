import { isBrowser, isWebWorker } from '@AssetSync/common'
import { receiveWorker } from '@AssetSync/WorkerSync'
import { startAssetSync } from './create-assetsync.js'

export async function server(startGame, worldSyncMain) {

    if (isWebWorker)
    {
        // client in main, server in worker 
        const worldSync = await receiveWorker()

        worldSync.addFunction('focus')

        worldSync.addEventListener('size', (data) => {
            
            worldSync.clientWidth = data.width
            worldSync.clientHeight = data.height
            worldSync.innerWidth = data.width
            worldSync.innerHeight = data.height

        })

        await new Promise((resolve) => {
            worldSync.addEventListener('start', async (data) => {

                worldSync.devicePixelRatio = data.devicePixelRatio
                worldSync.canvas = data.canvas
                worldSync.config = data.config
                worldSync.clientWidth = data.width
                worldSync.clientHeight = data.height
                worldSync.innerWidth = data.width
                worldSync.innerHeight = data.height

                worldSync.ownerDocument = worldSync
                worldSync.domElement = worldSync
                self.global = worldSync
                self.document = worldSync
                self.window = worldSync

                resolve()

            })
        })


        startGame({ assetSync: worldSync.config.assetSync ? await startAssetSync(worldSync) : undefined, worldSync: worldSync })
    }
    else
    {
        // TODO: fake proxy for same thread
        // in the case that we don't have a webworker (maybe offscreencanvas is not supported)
        // we need to pipe in the client proxy

        // for now, just fake some stuff
        const assetSync = await startAssetSync()
        // window.canvas = worldSync.canvas
        startGame({ assetSync, worldSync: worldSyncMain })
    }
}