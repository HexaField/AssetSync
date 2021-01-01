import { PluginBase } from '../../PluginBase.js'

export class NetworkPlugin extends PluginBase {

    constructor(options = {}) {
        super(options)
        this._pluginName = 'NetworkPlugin'
        this._transportPlugin = options.transportPlugin

        this._networks = {}

        this._networkEvents = options.networkEvents || {
            onPeerJoin: (networkID, peerID) => {
                this._networks[networkID].emit('onPeerJoin', peerID)
            },
            onPeerLeave: (networkID, peerID) => {
                this._networks[networkID].emit('onPeerLeave', peerID)
            },
            onMessage: (networkID, data, from) => {
                this._networks[networkID].emit('onMessage', data, from)
            }
        }
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

    setNetworkEvents(events) {
        this._networkEvents = events
    }

    async leaveAllNetworks() {
        for (let networkID of Object.keys(this._networks)) {
            await this._networks[networkID].leave()
        }
        return true
    }

    async leaveAllClientNetworks() {
        for (let networkID of Object.keys(this._networks)) {
            if (!this._networks[networkID]._options.isGlobalNetwork)
                await this._networks[networkID].leave()
        }
        return true
    }

    // todo: change callbacks to events

    async joinNetwork(networkID) {

        if (typeof networkID !== 'string') {
            this.log('ERROR you must supply a network id, got ', networkID)
            return false
        }

        if (this._networks[networkID])
            await this.leaveNetwork(networkID)

        // todo: make this a plugin
        this._networks[networkID] = this._transportPlugin.joinNetwork(networkID)

        this._networks[networkID].on('peer joined', (peerID) => {
            this._networkEvents.onPeerJoin(networkID, peerID)
        })

        this._networks[networkID].on('peer leave', (peerID) => {
            this._networkEvents.onPeerLeave(networkID, peerID)
        })

        this._networks[networkID].on('message', (message) => {
            if (message.from === this._transportPlugin.getPeerID()) return
            this._networkEvents.onMessage(networkID, message.data.toString(), message.from)
        })

        return this._networks[networkID]
    }

    async leaveNetwork(networkID) {
        if (!this._networks[networkID]) return
        try {
            await this._networks[networkID].leave()
            delete this._networks[networkID]
            return true
        } catch (error) {
            return false
        }
    }

    async sendToAll(networkID, data) {
        await this._networks[networkID].sendToAll(data)
        return true
    }

    async sendTo(networkID, data, peerID) {
        await this._networks[networkID].sendTo(peerID, data)
        return true
    }

    async broadcast(networkID, data) {
        await this._networks[networkID].broadcast(data)
        return true
    }

    async getPeers(networkID) {
        return this._networks[networkID].getPeers()
    }

    getPeerID() {
        return this._transportPlugin.getPeerID()
    }
}