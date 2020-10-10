import { PluginBase } from '../../PluginBase.js'
import { number } from '@AssetSync/common'

export class Libp2pPlugin extends PluginBase {

    constructor(options = {}) {
        super(options)
        this._libp2p = options.libp2p
        this._pluginName = 'CORE_IPFSPlugin'
    }

    async start(args = {}) {
        await super.start(args)

        this._peerID = this._libp2p.peerId.toB58String()

        this.peerInfo = {}
        this.peerInfo.peersCount = 0;
        this.showStats();

        await this.waitForIPFSPeers(number(this._options.minPeersCount))
        return true
    }

    async stop() {
        await super.stop(args)
        if (this.peerInterval)
            clearInterval(this.peerInterval);
        await this._libp2p.stop()
        return true
    }

    getPeerID() {
        return this._peerID
    }

    getLibp2p() {
        return this._libp2p
    }

    showStats() {
        this.peerInterval = setInterval(async () => {
            try {
                this.peerInfo.peersCount = await this._libp2p.connections.size
            } catch (err) {
                this.warn('An error occurred trying to check our peers:', err)
            }
        }, 1000)
    }


    async waitForIPFSPeers(minPeersCount) {
        this.log('Connecting to the network...', minPeersCount || '')
        return await new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                if (this.peerInfo.peersCount >= minPeersCount) {
                    resolve(true)
                    clearInterval(interval);
                }
            }, 1000)
        })
    }
}