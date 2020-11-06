import { isNode, EventDispatcher } from '@AssetSync/common'

export default async function (args) {
    new App(args)
}


class App extends EventDispatcher {
    constructor({ assetSync, worldSync }) {

        super()

        this.assetSync = assetSync
        this.worldSync = worldSync

        // realms (dht)
        // profiles (dht)
        // assets (dht)

        // TODO: eventually add support for physics, graphics, audio from node
        if (!isNode) {
            this.loadConjure()
        }
    }

    async loadConjure() {
        const { default: Conjure } = await  import('./Conjure.js')
        this.conjure =  new Conjure(this)
    }
    
}