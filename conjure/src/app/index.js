import { isNode, EventDispatcher } from '@AssetSync/common'

import Assets from './backend/Assets.js'
import RealmHandler from './backend/RealmHandler.js'
import ClientDatastore from './backend/ClientDatastore.js'

export default async function (args) {
    const app = new App(args)
    await app.start()
    return app
}

class App extends EventDispatcher {
    constructor({ assetSync } ) {
        super()
        this.assetSync = assetSync
    }

    async start() {

        this.assets = new Assets(this.assetSync)
        this.realms = new RealmHandler(this.assetSync)
        await this.realms.initialise()

        this.globalNetwork = await this.assetSync.networkPlugin.joinNetwork('/conjure')


        // this.assetSync.transportPlugin._libp2p.connectionManager.on('peer:connect', (connection) => {
        //     console.log(connection)
        // })

        if(isNode) {
            this.globalNetwork.on('onPeerJoin', (peerId) => {
                console.log('Peer ' + peerId.substring(0, 8) + ' joined')
            })
            this.globalNetwork.on('onPeerLeave', (peerId) => {
                console.log('Peer ' + peerId.substring(0, 8) + ' left')
            })
        }
        
        this.assetSync.dhtPlugin.dht.on('put', (key, value, from) => {
            console.log('Received dht entry', key, value)
            const entryKey = key.split(':')
            switch(entryKey[0]) {
                case this.realms.dhtType: this.realms.receiveFromDHT(entryKey[1], value, from); break;
                case this.assets.dhtType: this.assets.receiveFromDHT(entryKey[1], value, from); break;
                default: break;
            }
        })

        this.assetSync.dhtPlugin.dht.on('removed', (key, value) => {
            console.log('Removed dht entry', key, value)
            const entryKey = key.split(':')
            switch(entryKey[0]) {
                case this.realms.dhtType: this.realms.receiveFromDHT(key); break;
                case this.assets.dhtType: this.assets.receiveFromDHT(key); break;
                default: break;
            }
        })

        if (!isNode) {
            this.loadConjure()
        }
    }

    async loadConjure() {
        
        this.clientDatastore = new ClientDatastore(this.assetSync)
        await this.clientDatastore.initialise()
        window.clientDatastore = this.clientDatastore

        window.assetSync = this.assetSync
        
        const { startConjure } = await import('./conjure/Conjure.js')
        startConjure(this)
    }

}