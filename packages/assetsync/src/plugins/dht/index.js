import { PluginBase } from '../../PluginBase.js'

import uint8ArrayFromString from 'uint8arrays/from-string.js'
import uint8ArrayToString from 'uint8arrays/to-string.js'
import { isNode } from '@AssetSync/common'
import * as utils from '@AssetSync/common/src/datastore-utils.js'

export class DHTPlugin extends PluginBase {

    constructor(options = {}) {
        super(options)
        this._pluginName = 'DHTPlugin'
        this._transportPlugin = options.transportPlugin
        this._dhtConstructor = options.dhtConstructor
        this._datastoreConstructor = options.datastoreConstructor
        this._repoPath = options.repoPath || ''
        this._removeFunction = options.removeFunction || (() => { })

        this.dhts = {}
    }

    async start(args = {}) {
        await super.start(args)

        if (!this._datastoreConstructor) {
            if (isNode) {
                const { default: datastore } = await import('datastore-fs')
                this._datastoreConstructor = datastore
            } else {
                const { MemoryDatastore } = await import('interface-datastore')
                this._datastoreConstructor = MemoryDatastore
            }
        }
        this.dht = this._transportPlugin.getTransport()._dht

        if (!this.dht)
            throw new Error('No dht found!')

        this._repoLocation = this._transportPlugin.getTransport().repo ? this._transportPlugin.getTransport().repo.path : this._repoPath

        if (!this._repoLocation)
            this.warn('No repo location supplied! Will only be using memory.')

        this.dht.onPut = (record, peerId) => {
            this.dht.emit('put', uint8ArrayToString(record.key), uint8ArrayToString(record.value), peerId.toB58String())
        }
        this.dht.onRemoved = (record) => {
            this.dht.emit('removed', uint8ArrayToString(record.key), uint8ArrayToString(record.value))
        }

        this._defaultProtocol = this.dht.protocol
        this.dhts[this._defaultProtocol] = this.dht
    }

    async stop(args = {}) {
        await super.stop(args)
    }

    getDHT(protocol) {
        return this.dhts[protocol]
    }

    async addDHT(protocol, datastore) {
        if (!protocol) return
        if (this.dhts[protocol]) return this.dhts[protocol]
        const libp2p = this._transportPlugin.getTransport()
        const customDHT = new this._dhtConstructor({
            libp2p: libp2p,
            dialer: libp2p.dialer,
            peerId: libp2p.peerId,
            peerStore: libp2p.peerStore,
            registrar: libp2p.registrar,
            datastore: datastore || new this._datastoreConstructor(this._repoLocation + protocol),
            protocolPrefix: protocol
        })
        await customDHT.datastore.open()
        await customDHT.start()
        customDHT.on('peer', libp2p._onDiscoveryPeer)
        customDHT.onPut = (record, peerId) => {
            customDHT.emit('put', uint8ArrayToString(record.key), uint8ArrayToString(record.value), peerId.toB58String())
        }
        customDHT.onRemoved = (record) => {
            customDHT.emit('removed', uint8ArrayToString(record.key), uint8ArrayToString(record.value))
        }
        this.dhts[protocol] = customDHT
        return customDHT
    }

    async removeDHT(protocol) {
        if (!this.dhts[protocol]) return
        await this.dhts[protocol].stop()
        delete this.dhts[protocol]
    }

    async getAllLocal({ protocol, queryOptions } = {}) {
        if (!this.dhts[protocol || this._defaultProtocol]) return []
        const dht = this.dhts[protocol || this._defaultProtocol]
        const entries = []
        for await (const entry of dht.datastore.query(queryOptions || {})) {
            const record = utils.decodeRecord(entry.value)
            entries.push({
                key: uint8ArrayToString(record.key),
                value: uint8ArrayToString(record.value),
                timeReceived: record.timeReceived
            })
        }
        return entries
    }

    async removeLocal({ key, protocol, log }) {
        try {
            const keyArray = uint8ArrayFromString(key)
            return await this.dhts[protocol || this._defaultProtocol].removeLocal(keyArray)
        } catch (error) {
            if (log)
                this.log('Failed to remove', key, 'from dht: ', error)
        }
    }

    async putLocal({ key, value, protocol, log }) {
        try {
            const keyArray = uint8ArrayFromString(key)
            const valArray = uint8ArrayFromString(value)
            const record = await utils.createPutRecord(keyArray, valArray)
            return await this.dhts[protocol || this._defaultProtocol].datastore.put(utils.bufferToKey(keyArray), record)
        } catch (error) {
            if (log)
                this.log('Failed to put', key, 'locally: ', error)
        }
    }

    async get({ key, timeout, protocol, log }) {
        try {
            const keyArray = uint8ArrayFromString(key)
            const result = await this.dhts[protocol || this._defaultProtocol].get(keyArray, { timeout })
            return uint8ArrayToString(result)
        } catch (error) {
            if (log)
                this.log('Failed to get', key, 'from dht: ', error)
        }
    }

    async put({ key, value, minPeers, protocol, log }) {
        try {
            return await this.dhts[protocol || this._defaultProtocol].put(uint8ArrayFromString(key), uint8ArrayFromString(value), { minPeers })
        } catch (error) {
            if (log)
                this.log('Failed to put', key, 'to dht: ', error)
        }
    }
}