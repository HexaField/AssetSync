import { isWebWorker } from '@AssetSync/common'
import { startAssetSync } from './create-assetsync.js'

export default async function runServer() {
    const assetsync = await startAssetSync()
    // console.log(assetsync)
}

if(isWebWorker) {
    runServer()
}