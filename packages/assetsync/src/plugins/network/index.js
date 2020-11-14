import { PluginBase } from '../../PluginBase.js'

export class NetworkPlugin extends PluginBase {

    constructor(options = {}) {
        super(options)
        this._pluginName = 'CORE_NetworkPlugin'
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
                this._networks[networkID].emit('onMessage', data.opcode, data.content, from)
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

        if (typeof networkID !== 'string')
        {
            this.log('ERROR you must supply a network id, got ', networkID)
            return false
        }

        if (this._networks[networkID])
            await this.leaveNetwork(networkID)

        // todo: make this a plugin
        this._networks[networkID] = this._transportPlugin.joinNetwork(networkID)
        this._networks[networkID]

        this._networks[networkID].on('peer joined', (peerID) => { 
            this._networkEvents.onPeerJoin(networkID, peerID)
        })

        this._networks[networkID].on('peer leave', (peerID) => {
            this._networkEvents.onPeerLeave(networkID, peerID)
        })

        this._networks[networkID].on('message', (message) => {
            
            if (message.from === this._transportPlugin.getPeerID()) return

            if (message.data === undefined || message.data === null) {
                this.warn('Received bad buffer data', message.data, 'from peer', message.from)
                return
            }

            let data = JSON.parse(message.data)
            
            this._networkEvents.onMessage(networkID, data, message.from)
        })

        this._networks[networkID].sendToPeer = (opcode, content, peerID) => {
            this._networks[networkID].sendTo(peerID, JSON.stringify({ opcode, content }))
        }

        this._networks[networkID].sendToAll = (opcode, content) => {
            this._networks[networkID].broadcast(JSON.stringify({ opcode, content }))
        }

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

    async sendTo(networkID, opcode, content, peerID) {
        await this._networks[networkID].sendToPeer(peerID, opcode, content)
        return true
    }

    async sendData(networkID, opcode, content) {
        await this._networks[networkID].sendToAll(opcode, content)
        return true
    }

    async getPeers(networkID) {
        return this._networks[networkID].getPeers()
    }

    getPeerID() {
        return this._transportPlugin.getPeerID()
    }
}