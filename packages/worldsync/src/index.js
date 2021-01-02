import { startAssetSync } from './create-assetsync.js'

export async function server(startGame, repoPath) {
    const assetSync = await startAssetSync({ repoPath })
    return startGame({ assetSync })
}