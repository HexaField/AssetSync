import { isNode, EventDispatcher, isWebWorker } from '@AssetSync/common'

import Assets from './backend/Assets.js'
import Realms from './backend/Realms.js'
import Profiles from './backend/Profiles.js'

export default async function (args) {
    new App(args)
}

class App extends EventDispatcher {
    constructor({ assetSync, worldSync }) {

        super()
        this.assetSync = assetSync
        this.worldSync = worldSync

        this.start()
    }

    async start() {

        this.assets = new Assets(this.assetSync)
        this.realms = new Realms(this.assetSync)
        await this.realms.initialise()
        this.profiles = new Profiles(this.assetSync)

        if (!isNode) {
            if (isWebWorker) {
                worldSync.addFunction('requestPointerLock')
                worldSync.addFunction('exitPointerLock')
                worldSync.addFunction('hasFocus')
            }
            this.loadConjure()
        }
    }

    async loadConjure() {
        const { startConjure } = await import('./conjure/Conjure.js')
        startConjure(this)
    }

}