import { isBrowser, isWebWorker } from '@AssetSync/common'
import { receiveWorker } from '@AssetSync/WorkerSync'
import { startAssetSync } from './create-assetsync.js'

export async function server(startGame, worldSync) {

    if (isWebWorker)
    {
        // client in main, server in worker 
        const proxy = await receiveWorker()
        const assetSync = await startAssetSync(proxy)
        startGame(assetSync, proxy)
    }
    else
    {
        // TODO: fake proxy for same thread
        // in the case that we don't have a webworker (maybe offscreencanvas is not supported)
        // we need to pipe in the client proxy

        // for now, just fake some stuff
        const assetSync = await startAssetSync()
        // window.canvas = worldSync.canvas
        // startGame(assetSync, window)
    }
}