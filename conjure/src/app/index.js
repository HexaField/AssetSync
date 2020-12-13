import { isNode, EventDispatcher, isWebWorker } from '@AssetSync/common'

import Assets from './backend/Assets.js'
import RealmHandler from './backend/Realms.js'
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
        this.realms = new RealmHandler(this.assetSync)
        await this.realms.initialise()
        this.profiles = new Profiles(this.assetSync)

        this.globalNetwork = await this.assetSync.networkPlugin.joinNetwork('/conjure')

        if(isNode) {
            this.globalNetwork.on('onPeerJoin', (peerId) => {
                console.log('Peer ' + peerId.substring(0, 8) + ' joined')
            })
            this.globalNetwork.on('onPeerLeave', (peerId) => {
                console.log('Peer ' + peerId.substring(0, 8) + ' left')
            })
        }
        
        this.assetSync.dhtPlugin.dht.on('put', (key, value, from) => {
            console.log('Received dht entry ' + key)
            const entryKey = key.split(':')
            switch(entryKey[0]) {
                case this.realms.dhtType: this.realms.receiveFromDHT(key, value, from); break;
                case this.assets.dhtType: this.assets.receiveFromDHT(key, value, from); break;
                default: break;
            }
        })

        this.assetSync.dhtPlugin.dht.on('removed', (key, value) => {
            console.log('Removed dht entry ' + key)
            const entryKey = key.split(':')
            switch(entryKey[0]) {
                case this.realms.dhtType: this.realms.receiveFromDHT(key); break;
                case this.assets.dhtType: this.assets.receiveFromDHT(key); break;
                default: break;
            }
        })

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