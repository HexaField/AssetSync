import { isNode } from '@AssetSync/common'
import WorldSync from '@AssetSync/WorldSync'
import { runApp } from './server/index.js'

async function startApp() {

    console.log(window)
    const worldSync = await WorldSync({ 
        serverFile: '_dist_/server/index.js', 
        serverFunc: runApp,
        client: await(await import('./client/index.js')).default,
        canvas: isNode ? undefined : document.getElementById('transferrablecanvas'),
        config: {
            assetSync: true
        }
    })
}
startApp()
