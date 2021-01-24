import { startAssetSync } from './create-assetsync.js'

export async function server(startGame, assetSyncArgs, appArgs) {
    const assetSync = await startAssetSync({ ...assetSyncArgs })
    return startGame({ assetSync, appArgs })
}