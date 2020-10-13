import Room from './ipfs-pubsub-room/index.js'
import { PluginBase } from '../../PluginBase.js'

export class NetworkPlugin extends PluginBase {

    constructor(options = {}) {
        super(options)
        this._pluginName = 'CORE_NetworkPlugin'
        this._libp2pPlugin = options.libp2pPlugin

        this.networks = {}
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
        for (let networkID of Object.keys(this.networks)) {
            await this.networks[networkID].leave()
        }
    }

    async leaveAllClientNetworks() {
        for (let networkID of Object.keys(this.networks)) {
            if (!this.networks[networkID]._options.isGlobalNetwork)
                await this.networks[networkID].leave()
        }
    }

    // todo: change callbacks to events

    async joinNetwork(networkID) {
        
        if (!networkID || !this._libp2pPlugin.getLibp2p()) return false

        if (this.networks[networkID])
            await this.leaveNetwork(networkID)

        // todo: make this a plugin
        this.networks[networkID] = new Room(this._libp2pPlugin.getLibp2p(), networkID)

        this.networks[networkID].on('peer joined', (peerID) => { this.emit('onPeerJoin', peerID) })
        this.networks[networkID].on('peer leave', (peerID) => { this.emit('onPeerLeave', peerID) })
        this.networks[networkID].on('message', (message) => {

            if (message.from === this._libp2pPlugin.getPeerID()) return

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

            this.emit('onMessage', data, message.from);
        })

        return true
    }

    async leaveNetwork(networkID) {
        if (!this.networks[networkID]) return
        try {
            await this.networks[networkID].leave()
            delete this.networks[networkID]
            return true
        } catch (error) {
            return false
        }
    }

    async sendTo(networkID, protocol, content, peerID) {
        if (!this.networks[networkID]) return
        if (!peerID) return;
        if (!content) content = '';

        await this.networks[networkID].sendTo(peerID, JSON.stringify({ protocol, content }));
    }

    async sendData(networkID, protocol, content) {
        if (!this.networks[networkID]) return
        if (!content) content = '';

        await this.networks[networkID].broadcast(JSON.stringify({ protocol: protocol, content: content }));
    }

    getPeers(networkID) {
        return this.networks[networkID].getPeers()
    }
}