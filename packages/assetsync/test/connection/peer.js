import AssetSync, { ConnectionPlugin } from '../../src/index.js'

export default class Peer {

    constructor(peerOptions) {
        this.assetSync = new AssetSync()
        this.connectionPlugin = new ConnectionPlugin({peerOptions})
    }

    async start() {
        await this.assetSync.register({ connectionPlugin: this.connectionPlugin })
        await this.assetSync.initialise()
    }
}