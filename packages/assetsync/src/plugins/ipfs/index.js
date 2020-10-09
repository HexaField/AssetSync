import IPFS from 'ipfs'
import { PluginBase } from '../../PluginBase'
import { homedir, number } from '../../utils'

export class IPFSPlugin extends PluginBase {

    constructor(options = {}) {
        super(options)
        this._pluginName = 'CORE_IPFSPlugin'
    }

    async start(args = {}) {
        await super.start(args)

        if (args.isSlave) 
            return true

        this._ipfs = await this.loadIPFS()
        this._peerID = await (await this._ipfs.id()).id

        this.ipfsInfo = {}
        this.ipfsInfo.peersCount = 0;
        this.showStats();

        await this.waitForIPFSPeers(number(this._options.minPeersCount))
        return true
    }

    async stop() {
        await super.stop(args)
        if (this.peerInterval)
            clearInterval(this.peerInterval);
        await this._ipfs.stop()
        return true
    }

    getPeerID() {
        return this._peerID
    }

    getIPFS() {
        return this._ipfs
    }

    async loadIPFS() {
        this.log('Connecting to IPFS and making repo at' + homedir())
        return await IPFS.create(this._options.ipfsConfig)
    }

    showStats() {
        this.peerInterval = setInterval(async () => {
            try {
                const peers = await this._ipfs.swarm.peers()
                this.ipfsInfo.peersCount = peers.length
            } catch (err) {
                this.warn('An error occurred trying to check our peers:', err)
            }
        }, 1000)
    }


    async waitForIPFSPeers(minPeersCount) {
        this.log('Connecting to the network...', minPeersCount || '')
        return await new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                if (this.ipfsInfo.peersCount >= minPeersCount) {
                    resolve(true)
                    clearInterval(interval);
                }
            }, 1000)
        })
    }
}