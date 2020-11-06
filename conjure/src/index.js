import { isNode } from '@AssetSync/common'
import WorldSync from '@AssetSync/WorldSync'
import { runApp } from './start.js'
import { getParams } from './urldecoder.js'

async function startApp() {

    console.log(window)
    const worldSync = await WorldSync({ 
        serverFile: '_dist_/start.js', 
        serverFunc: runApp,
        // client: await(await import('./client/index.js')).default,
        canvas: isNode ? undefined : document.getElementById('canvas'),
        config: {
            assetSync: false,
            urlParams: getParams(location.href)
        }
    })
}
startApp()
