import test from 'ava'
import app from '../src/app/index.js'

import { server } from '@AssetSync/WorldSync'

test.serial('can start backend', async (t) => {

    const App = await server(app)

    return new Promise(async (resolve) => {
        resolve(App)
    }).then((results) => {
        t.not(results.assetSync, undefined)
        t.not(results.assetSync.networkPlugin, undefined)
        t.not(results.assetSync.dhtPlugin, undefined)
    })
})