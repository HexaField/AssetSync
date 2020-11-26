import { isNode } from '@AssetSync/common'
import WorldSync from '@AssetSync/WorldSync'
import { runApp } from './start.js'
import { getParams } from './urldecoder.js'

async function startApp() {

    if(isNode) {

        runApp()

    } else {

        const worldSync = await WorldSync({ 
            // serverFile: '_dist_/start.js', 
            serverFunc: runApp,
            canvas: document.getElementById('canvas'),
            config: {
                assetSync: false,
                urlParams: getParams(location.href),
                touchDevice: Boolean('ontouchstart' in window)
            }
        })
        if(worldSync._isRunningInWorker) {

            const { MediaHandler } = await import('./media/MediaHandler.js')
            const mediaHandler = new MediaHandler(worldSync)

            worldSync._peerSync.addEventListener('requestPointerLock', () => { 
                worldSync._peerSync.canvas.requestPointerLock()
            })
            worldSync._peerSync.addEventListener('exitPointerLock', () => { 
            document.exitPointerLock()
            })
            worldSync._peerSync.addEventListener('open', (...args) => { 
            window.open(...args)
            })
            worldSync._peerSync.addRequestOpcode('media', async (args) => {
                return await mediaHandler.handle(args)
            })
        }
    }
}
startApp()
