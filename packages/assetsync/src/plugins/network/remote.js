import { NetworkPlugin } from './index.js'
import { EventEmitter } from 'events'

export class RemoteNetworkPlugin extends NetworkPlugin {

    constructor(options = {}) {
        super(options)
        this._pluginName = 'CORE_RemoteNetworkPlugin'
    }

    setTarget(target) {
        this._target = target
    }

    async start(args = {}) {
        await super.start(args)
    }

    async stop(args = {}) {
        await super.stop(args)
        await this.leaveAllNetworks()
    }

    async leaveAllNetworks() {
        await this.sendEvent('leaveAllNetworks')
    }

    async leaveAllClientNetworks() {
        await this.sendEvent('leaveAllClientNetworks')
    }

    async joinNetwork(networkID) {
        const eventEmitter = new EventEmitter()
        this._target.addEventListener('networkEvent-'+networkID, (event, ...data) => {
            eventEmitter.emit(event, ...data)
        })
        this.sendEvent('joinNetwork', networkID)
        return eventEmitter
    }

    async leaveNetwork(networkID) {
        await this.sendEvent('leaveNetwork', networkID)
    }

    async sendTo(networkID, protocol, content, peerID) {
        await this.sendEvent('sendTo', [networkID, protocol, content, peerID])
    }

    async sendData(networkID, protocol, content) {
        await this.sendEvent('sendData', [networkID, protocol, content])
    }

    // todo, workersync stuff
    async getPeers(networkID) {
        return await this.sendEvent('getPeers', networkID)
    }

    async sendEvent(protocol, args) {
        return await this._target.makeRequest(protocol, args)
    }
}