import diff from 'hyperdiff'
import { EventEmitter } from 'events'

const OPCODES_SYNCED_DATABASE = {
    addEntry: 'addEntry',
    removeEntry: 'removeEntry',

    requestKeys: 'requestKeys',
    receiveKeys: 'receiveKeys',

    requestEntries: 'requestEntries',
    receiveEntries: 'receiveEntries',
}

// TODO: make timestamps originate once, instead of upon replication - this will make way to many uneccesary updates happen

export class SyncedDatabase extends EventEmitter {
    constructor(databaseName, networkPlugin, diskStorage) {
        super()
        this._data = {} // { timestamp, value }

        this._databaseName = databaseName
        this._networkPlugin = networkPlugin
        this._diskStorage = diskStorage

        // this._isDatabaseUpToDate = false
    }

    async initialise() {
        await this.loadFromDisk()
        await this.subscribe()
        await new Promise((resolve, reject) => {
            // wait for confirmation that database has been successfully loaded and verified
            resolve()
        })
        await this.saveToDisk()
        // this._isDatabaseUpToDate = true
    }

    async close() {
        await this.unsubscribe()
    }

    async subscribe() {
        this.network = await this._networkPlugin.joinNetwork('database-' + this._databaseName)
        this.network.on('onPeerJoin', (peerID) => {
            // this.network.sendTO(OPCODES_SYNCED_DATABASE.requestKeys)
        })
        this.network.on('onPeerLeave', (peerID) => {})
        this.network.on('onMessage', (opcode, content, peerID) => {
            // console.log('onMessage', opcode, content, peerID)
            this.emit(opcode, content, peerID)
        })
        
        // content = { key, value }
        this.on(OPCODES_SYNCED_DATABASE.addEntry, async (content, peerID) => {
            this.addEntry(content.key, content.value, true)
        })

        // content = key
        this.on(OPCODES_SYNCED_DATABASE.removeEntry, async (content, peerID) => {
            this.removeEntry(content, true)
        })

        // content = undefined (unused)
        this.on(OPCODES_SYNCED_DATABASE.requestKeys, async (content, peerID) => {
            // if (!this._isDatabaseUpToDate) return // we dont want to send outdated
            this.network.sendToPeer(OPCODES_SYNCED_DATABASE.receiveKeys, this.getAllKeysAndTimestamps(), peerID)
        })

        // content = [...{ key, timestamp }]
        this.on(OPCODES_SYNCED_DATABASE.receiveKeys, async (content, peerID) => {
            let entriesToRequest = this.getDifferences(content)
            this.network.sendToPeer(OPCODES_SYNCED_DATABASE.requestEntries, entriesToRequest, peerID)
        })

        // content = [...key]
        this.on(OPCODES_SYNCED_DATABASE.requestEntries, async (content, peerID) => {
            this.network.sendToPeer(OPCODES_SYNCED_DATABASE.receiveEntries, this.getEntriesByKeys(content), peerID)
        })

        // content = [...{ key, value }]
        this.on(OPCODES_SYNCED_DATABASE.receiveEntries, async (content, peerID) => {
            for (let entry of content)
                this.addEntry(entry.key, entry.value, true)

            await this.saveToDisk()
            // this._isDatabaseUpToDate = true // we need to add more checks with multiple peers to make sure database is actually up to date
        })

        this.network.sendToAll(OPCODES_SYNCED_DATABASE.requestKeys)
    }

    async unsubscribe() {
        await this._networkPlugin.leaveNetwork('database-' + this._databaseName)
    }

    async addEntry(key, value, fromNetwork) {
        this._data[key] = { timestamp: Date.now(), value: value }
        if (fromNetwork) {
            this.emit('entry:add', { key, value })
        } else {
            this.network.sendToAll(OPCODES_SYNCED_DATABASE.addEntry, { key, value })
        }
        await this.saveToDisk() // temp
        return true
    }

    async removeEntry(key, fromNetwork) {
        if (!this._data[key])
            return false
            
        delete this._data[key]
        if (fromNetwork) {
            this.emit('entry:remove', { key })
        } else {
            this.network.sendToAll(OPCODES_SYNCED_DATABASE.removeEntry, key)
        }
        await this.saveToDisk() // temp
        return true
    }

    getEntry(key) {
        if (!this._data[key])
            return
        return this._data[key].value
    }

    getEntriesWithTimestamps(key) {
        if (!this._data[key])
            return
        return this._data[key]
    }

    getEntriesByKeys(keys) {
        let entries = []
        for (let key of keys)
            entries.push({ key, value: this._data[key].value }) // theres probably a function for this
        return entries
    }

    getEntriesAsList() {
        return Object.keys(this._data).sort().map((key) => {
            return { key, value: this._data[key].value }
        })
    }

    getAllEntries() {
        return this._data
    }

    getAllValues() {
        let values = Object.keys(this._data).map((key) => {
            return this._data[key].value
        })
        return values
    }

    getAllKeysAndTimestamps() {
        // we sort because diff in getDifferences requires it to be
        return Object.keys(this._data).sort().map((key) => {
            return { key, timestamp: this._data[key].timestamp }
        })
    }

    async saveToDisk() {
        await this._diskStorage.writeFile(this._databaseName + '.json', JSON.stringify(this._data))
    }

    async loadFromDisk() {
        try {
            let data = await this._diskStorage.readFile(this._databaseName + '.json')
            this._data = data ? JSON.parse(data) : {}
        } catch (e) {
            console.log(e)
        }
    }

    // TODO: figure out who to get this data from
    // listOfKeys = [{ key, timestamp }, ...]
    getDifferences(entries) {
        let neededKeys = []
        const differences = diff(this.getAllKeysAndTimestamps(), entries)
        differences.added.forEach((entry) => {
            neededKeys.push(entry.key)
        })
        differences.removed.forEach((entry) => {
            this.removeEntry(entry.key)
        })
        differences.common.forEach((entry) => {
            if (entry.timestamp > this._data[entry.key].timestamp)
                neededKeys.push(entry.key)
        })
        return neededKeys
    }

    setUpToDate() {
        // this._isDatabaseUpToDate
        this.emit('sync')
    }
}