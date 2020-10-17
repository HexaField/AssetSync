import { PluginBase } from '../../PluginBase.js'
import { number } from '@AssetSync/common'
import Room from './ipfs-pubsub-room/index.js'

export class Libp2pPlugin extends PluginBase {

    constructor(options = {}) {
        super(options)
        this._libp2p = options.libp2p
        this._pluginName = 'CORE_Libp2pPlugin'
    }

    async start(args = {}) {
        await super.start(args)

        if(typeof this._libp2p === 'function')
        {
            this.log('Starting libp2p...')
            this._libp2p = await this._libp2p()
            this.log('Started libp2p with ID', this._libp2p.peerId.toB58String())
        }

        this._peerID = this._libp2p.peerId.toB58String()

        this.peerInfo = {}
        this.peerInfo.peersCount = 0;
        this._showStats();

        await this._waitForLibp2pPeers(number(this._options.minPeersCount))
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

    getTransport() {
        return this._libp2p
    }

    joinNetwork(networkID) {
        return new Room(this._libp2p, networkID)
    }

    _showStats() {
        this.peerInterval = setInterval(async () => {
            try {
                this.peerInfo.peersCount = await this._libp2p.connections.size
            } catch (err) {
                this.warn('An error occurred trying to check our peers:', err)
            }
        }, 1000)
    }

    async _waitForLibp2pPeers(minPeersCount) {
        this.log('Connecting to the network...', minPeersCount || '')
        return await new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                this.log(' - Found', this.peerInfo.peersCount, 'peers...')
                if (this.peerInfo.peersCount >= minPeersCount) {
                    resolve(true)
                    clearInterval(interval);
                }
            }, 1000)
        })
    }
}