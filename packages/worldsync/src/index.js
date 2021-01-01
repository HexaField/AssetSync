import { startAssetSync } from './create-assetsync.js'

export async function server(startGame) {
    const assetSync = await startAssetSync()
    return startGame({ assetSync })
}