import worldSync from '@AssetSync/WorldSync'

async function startApp() {

    const WorldSync = await worldSync({ 
        serverFile: '_dist_/start-server/index.js', 
        serverFunc: await(await import('./start-server/index.js')).default 
    })
    // console.log(WorldSync)
}
startApp()
