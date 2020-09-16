import NetworkInterface from './NetworkInterface'
import diff from 'hyperdiff'

export const PROTOCOLS_SYNCED_DATABASE = {
    addEntry: 'addEntry',
    removeEntry: 'removeEntry',

    requestKeys: 'requestKeys',
    receiveKeys: 'receiveKeys',

    requestEntries: 'requestEntries',
    receiveEntries: 'receiveEntries',
}

export default class SyncedDatabase extends NetworkInterface
{  
    constructor(networkManager, database, diskStorage)
    {
        super()
        this.networkManager = networkManager
        this.databaseName = database
        this.data = {} // { timestamp, value }
        this.isDatabaseUpToDate = false
        this.diskStorage = diskStorage
    }

    async initialise()
    {
        await this.loadFromDisk()
        await this.subscribe()
        await this.saveToDisk()
        await new Promise((resolve, reject) => {
            // wait for confirmation that database has been successfully loaded and verified
            resolve()
        })
        this.isDatabaseUpToDate = true
    }

    async close()
    {
        await this.unsubscribe()
    }

    async subscribe()
    {
        this.network = await this.networkManager.joinNetwork(
            'syncedDatabase-' + this.databaseName, 
            this.callProtocol,
            (peerID) => {
                // console.log('Peer started listening to database ' + database)
            },
            (peerID) => {
                // console.log('Peer stopped listening to database ' + database)
            },
            { isGlobalNetwork: true } // this stops the node server from leaving the network when the browser disconnects
        )
        
        // content = { key, value }
        this.setProtocolCallback(PROTOCOLS_SYNCED_DATABASE.addEntry, async (content, peerID) => {
            this.addEntry(content.key, content.value, true)
        })
        
        // content = key
        this.setProtocolCallback(PROTOCOLS_SYNCED_DATABASE.removeEntry, async (content, peerID) => {
            this.removeEntry(content, true)
        })
        
        // content = undefined (unused)
        this.setProtocolCallback(PROTOCOLS_SYNCED_DATABASE.requestKeys, async (content, peerID) => {
            if(!this.isDatabaseUpToDate) return // we dont want to send outdated
            this.network.sendTo(PROTOCOLS_SYNCED_DATABASE.receiveKeys, this.getAllKeysAndTimestamps(), peerID)
        })

        // content = [...{ key, timestamp }]
        this.setProtocolCallback(PROTOCOLS_SYNCED_DATABASE.receiveKeys, async (content, peerID) => {
            let entriesToRequest = this.getDifferences(content)
            this.network.sendTo(PROTOCOLS_SYNCED_DATABASE.requestEntries, entriesToRequest, peerID)
        })

        // content = [...key]
        this.setProtocolCallback(PROTOCOLS_SYNCED_DATABASE.requestEntries, async (content, peerID) => {
            this.network.sendTo(PROTOCOLS_SYNCED_DATABASE.receiveEntries, this.getEntriesByKeys(content), peerID)
        })

        // content = [...{ key, value }]
        this.setProtocolCallback(PROTOCOLS_SYNCED_DATABASE.receiveEntries, async (content, peerID) => {
            for(let entry of content)
                this.addEntry(entry.key, entry.value, true)

            await this.saveToDisk()
            this.isDatabaseUpToDate = true // we need to add more checks with multiple peers to make sure database is actually up to date
        })

        this.network.sendData(PROTOCOLS_SYNCED_DATABASE.requestKeys)
    }

    async unsubscribe()
    {
        await this.networkManager.leaveNetwork('syncedDatabase-' + this.databaseName)
    }

    addEntry(key, value, fromNetwork)
    {
        if(!fromNetwork)
            this.network.sendData(PROTOCOLS_SYNCED_DATABASE.addEntry, { key, value })
        
        this.data[key] = { timestamp: Date.now(), value: value }
        return true
    }

    removeEntry(key, fromNetwork)
    {
        if(!this.data[key])
            return false
        
        if(!fromNetwork)
            this.network.sendData(PROTOCOLS_SYNCED_DATABASE.removeEntry, key)
        
        delete this.data[key]
        return true
    }

    getEntry(key)
    {
        if(!this.data[key])
            return
        return this.data[key].value
    }

    getEntriesWithTimestamps(key)
    {
        if(!this.data[key])
            return
        return this.data[key]
    }

    getEntriesByKeys(keys)
    {
        let entries = []
        for(let key of keys)
            entries.push({ key, value: this.data[key].value }) // theres probably a function for this
        return entries
    }

    getAllEntries()
    {
        return this.data
    }

    getAllValues()
    {
        let values = this.data.map((key) => { 
            return this.data[key].value
        })
        return values
    }

    getAllKeysAndTimestamps()
    {
        // we sort because diff in getDifferences requires it to be
        return Object.keys(this.data).sort().map((key) => { 
            return { key, timestamp: this.data[key].timestamp } 
        })
    }

    async saveToDisk()
    {
        await this.diskStorage.writeFile(this.databaseName + '.json', JSON.stringify(this.data))
    }

    async loadFromDisk()
    {
        try {
            let data = await this.diskStorage.readFile(this.databaseName + '.json')
            this.data = data ? JSON.parse(data) : {}
        } catch (e) {
            console.log(e)
        }
    }

    // TODO: figure out who to get this data from
    // listOfKeys = [{ key, timestamp }, ...]
    getDifferences(entries)
    {
        let neededKeys = []
        const differences = diff(this.getAllKeysAndTimestamps(), entries)
        differences.added.forEach((entry) => {
            neededKeys.push(entry.key)
        })
        differences.removed.forEach((entry) => {
            this.removeEntry(key)
        })
        differences.common((entry) => {
            if(entry.timestamp > this.data[entry.key].timestamp)
                neededKeys.push(entry.key)
        })
        return neededKeys
    }
}