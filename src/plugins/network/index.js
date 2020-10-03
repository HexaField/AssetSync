import Room from './ipfs-pubsub-room'
import { PluginBase } from '../../PluginBase'

const ASSETSYNC_PLUGIN_PROTOCOLS_NETWORK = {
    NETWORK_JOIN: 'joinNetwork',
    NETWORK_SEND_DATA: 'sendDataNetwork',
    NETWORK_SEND_TO: 'sendToNetwork',
    NETWORK_LEAVE: 'networkLeave',
}

export class NetworkPlugin extends PluginBase {

    constructor(options) {
        super(options)
        this._ipfsPlugin = options.ipfsPlugin
        this._pluginName = 'CORE_NetworkPlugin'

        this.networks = {}
    }

    async register(args = {}) {
        this._assetSync.addProtocolFunction({
            protocol: ASSETSYNC_PLUGIN_PROTOCOLS_NETWORK.NETWORK_JOIN,
            callbacks: (data) => {
                return {
                    id: data.network,
                    funcs: {
                        onMessage: data.onMessage,
                        onPeerJoin: data.onPeerJoin,
                        onPeerLeave: data.onPeerLeave,
                    }
                }
            },
            handler: async (data) => {
                return Boolean(await this.joinNetwork(data.network, data.onMessage, data.onPeerJoin, data.onPeerLeave))
                    ? 'Successfully joined network ' + data.network
                    : 'ERROR: failed to join network' + data.network
            }
        })
    }

    async start(args = {}) {
        await super.start(args)
        return true
    }

    // TODO this needs to be fixed
    async stop(args = {}) {
        await super.stop(args)
        await this.leaveAllNetworks()
        return true
    }

    async leaveAllNetworks() {
        for (let network of Object.keys(this.networks)) {
            await this.networks[network].leave()
        }
    }

    async leaveAllClientNetworks() {
        for (let network of Object.keys(this.networks)) {
            if (!this.networks[network].userData.isGlobalNetwork)
                await this.networks[network].leave()
        }
    }

    async joinNetwork(network, onMessage, onPeerJoin, onPeerLeave) {
        if (!network || !this._ipfsPlugin.getIPFS()) return false

        if (this.networks[network])
            await this.leaveNetwork(network)


        // todo: make this a plugin
        this.networks[network] = new Room(this._ipfsPlugin.getIPFS(), network)

        this.networks[network].on('peer joined', onPeerJoin)
        this.networks[network].on('peer leave', onPeerLeave)
        this.networks[network].on('message', (message) => {

            if (message.from === this._ipfsPlugin.getPeerID()) return

            if (message.data === undefined || message.data === null) {
                this.warn('Received bad buffer data', message.data, 'from peer', message.from)
                return
            }

            let data = message.data

            try {
                data = JSON.parse(data);
            }
            catch (error) {
                this.warn('Received bad json data', data, 'from peer', message.from);
                return;
            }

            onMessage(data, message.from);
        })

        return this.networks[network]
    }

    async leaveNetwork(network) {
        if (!this.networks[network]) return
        try {
            await this.networks[network].leave()
            delete this.networks[network]
            return true
        } catch (error) {
            return false
        }
    }

    async sendTo(network, protocol, content, peerID) {
        if (!this.networks[network]) return
        if (!peerID) return;
        if (!content) content = '';

        await this.networks[network].sendTo(peerID, JSON.stringify({ protocol, content }));
    }

    async sendData(network, protocol, content) {
        if (!this.networks[network]) return
        if (!content) content = '';

        await this.networks[network].broadcast(JSON.stringify({ protocol: protocol, content: content }));
    }

    getPeers(network) {
        return this.networks[network].getPeers()
    }
}

NetworkPlugin.ASSETSYNC_PLUGIN_PROTOCOLS_NETWORK = ASSETSYNC_PLUGIN_PROTOCOLS_NETWORK