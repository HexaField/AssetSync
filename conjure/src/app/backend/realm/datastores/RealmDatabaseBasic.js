
import { MemoryDatastore } from 'interface-datastore'
import * as utils from '@AssetSync/common/src/datastore-utils.js'
import uint8ArrayFromString from 'uint8arrays/from-string.js'
import uint8ArrayToString from 'uint8arrays/to-string.js'
import { isNode, number } from '@AssetSync/common'
import diff from 'hyperdiff'
import { NETWORKING_OPCODES } from '../../Constants.js'
import { REALM_TYPES } from '../RealmData.js'

const OPCODES_SYNCED_DATABASE = {
    addEntry: 'addEntry',
    removeEntry: 'removeEntry',

    requestKeys: 'requestKeys',
    receiveKeys: 'receiveKeys',

    requestEntries: 'requestEntries',
    receiveEntries: 'receiveEntries',
}

export default async (realmDatabase) => {
    let datastoreObjects
    if(realmDatabase.assetSync.transportPlugin._libp2p.repo && realmDatabase.realmData.type !== REALM_TYPES.EPHEMERAL) {
        datastoreObjects = await realmDatabase.assetSync.transportPlugin._libp2p.repo.openDatastore(realmDatabase.dhtProtocol + '/objects')
    } else {
        datastoreObjects = new MemoryDatastore()
    }

    let datastoreMetadata
    if(realmDatabase.assetSync.transportPlugin._libp2p.repo && realmDatabase.realmData.type !== REALM_TYPES.EPHEMERAL) {
        datastoreMetadata = await realmDatabase.assetSync.transportPlugin._libp2p.repo.openDatastore(realmDatabase.dhtProtocol + '/metadata')
    } else {
        datastoreMetadata = new MemoryDatastore()
    }

    const getMetadata = async (key) => {
        try {
            const keyArray = uint8ArrayFromString(key)
            const entry = await datastoreMetadata.get(utils.bufferToKey(keyArray))
            const record = utils.decodeRecord(entry)
            return uint8ArrayToString(record.value)
        } catch (err) {
            // console.log(err)
            return undefined
        }
    }

    const putMetadata = async (key, value) => {
        try {
            const keyArray = uint8ArrayFromString(key)
            const valueArray = uint8ArrayFromString(value)
            const record = await utils.createPutRecord(keyArray, valueArray)
            await datastoreMetadata.put(utils.bufferToKey(keyArray), record)
            return true
        } catch (err) {
            // console.log(err)
            return false
        }
    }

    realmDatabase._get = async (key) => {
        try {
            const keyArray = uint8ArrayFromString(key)
            const entry = await datastoreObjects.get(utils.bufferToKey(keyArray))
            const record = utils.decodeRecord(entry)
            return {
                key: uint8ArrayToString(record.key),
                value: uint8ArrayToString(record.value),
                timeReceived: record.timeReceived
            }
        } catch (err) {
            console.log(err)
            return undefined
        }
    }

    realmDatabase._put = async (key, value, time) => {
        try {
            const keyArray = uint8ArrayFromString(key)
            const valueArray = uint8ArrayFromString(value)
            const record = await utils.createPutRecord(keyArray, valueArray, time)
            await datastoreObjects.put(utils.bufferToKey(keyArray), record)
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

    realmDatabase._getAllLocal = async () => {
        try {
            const entries = []
            for await (const entry of datastoreObjects.query({})) {
                if(!entry.value || !entry.value.length) continue
                const record = utils.decodeRecord(entry.value)
                entries.push({
                    key: uint8ArrayToString(record.key),
                    value: uint8ArrayToString(record.value),
                    timeReceived: record.timeReceived
                })
            }
            return entries
        } catch (err) {
            console.log(err)
            return []
        }
    }

    realmDatabase._removeLocal = async (key) => {
        try {
            const keyArray = uint8ArrayFromString(key)
            await datastoreObjects.delete(utils.bufferToKey(keyArray))
            await datastoreObjects.put(utils.bufferToKey(keyArray), uint8ArrayFromString(''))
            return true
        } catch (err) {
            console.log(err)
            // if (err.code === 'ERR_NOT_FOUND') {
            //     return false
            // }
            throw false
        }
    }

    const getLastSynced = async () => {
        return number(await getMetadata('lastSynced'))
    }

    const setLastSynced = async () => {
        await putMetadata('lastSynced', String(Date.now()))
    }

    const lastSynced = await getLastSynced()
    if(lastSynced) {
        console.log('Last synced at', new Date(lastSynced).toLocaleString())
    } else {
        await putMetadata('lastSynced', String(0))
    }

    realmDatabase.network.on('onPeerJoin', async (peerID) => {
        // console.log('Hello ',peerID,'! Requesting keys...')
        realmDatabase.sendTo(peerID, OPCODES_SYNCED_DATABASE.requestKeys, await getLastSynced())
    })
    
    realmDatabase.network.on('onPeerLeave', (peerID) => { })

    // content = lastUpdated
    realmDatabase.on(OPCODES_SYNCED_DATABASE.requestKeys, async (content, peerID) => {
        if(content < await getLastSynced())
            realmDatabase.sendTo(peerID, OPCODES_SYNCED_DATABASE.receiveKeys, await getAllKeysAndTimes())
    })

    // content = [...{ key, timeReceived }]
    realmDatabase.on(OPCODES_SYNCED_DATABASE.receiveKeys, async (content, peerID) => {
        if(Array.isArray(content) && content.length)
            realmDatabase.sendTo(peerID, OPCODES_SYNCED_DATABASE.requestEntries, await getDifferences(content))
    })

    // content = [...key]
    realmDatabase.on(OPCODES_SYNCED_DATABASE.requestEntries, async (content, peerID) => {
        if(Array.isArray(content) && content.length)
            realmDatabase.sendTo(peerID, OPCODES_SYNCED_DATABASE.receiveEntries, await getEntriesByKeys(content))
    })

    // content = [...{ key, value }]
    realmDatabase.on(OPCODES_SYNCED_DATABASE.receiveEntries, async (content, peerID) => {
        for (let entry of content) {
            await realmDatabase._put(entry.key, entry.value, entry.timeReceived)
            realmDatabase.emit(NETWORKING_OPCODES.OBJECT.RECEIVE, { uuid: entry.key, data: entry.value })
        }

        // we are now up to do
        await setLastSynced()
    })

    async function getAllKeysAndTimes() {
        // we sort because diff in getDifferences requires it to be
        return (await realmDatabase._getAllLocal()).sort().map(({ key, value, timeReceived }) => {
            return { key, timeReceived }
        })
    }

    async function getEntriesByKeys(keys) {
        let entries = []
        for (let key of keys) {
            entries.push(await realmDatabase._get(key))
        }
        return entries
    }

    // TODO: figure out who to get this data from
    // listOfKeys = [{ key, timeReceived }, ...]
    async function getDifferences(entries) {
        let neededKeys = []
        const differences = diff(await getAllKeysAndTimes(), entries)
        differences.added.forEach((entry) => {
            neededKeys.push(entry.key)
        })
        differences.removed.forEach((entry) => {
            realmDatabase._removeLocal(entry.key)
        })
        differences.common.forEach(async (entry) => {
            if (entry.timeReceived > (await realmDatabase._get(key)).timeReceived) {
                neededKeys.push(entry.key)
            }
        })
        return neededKeys
    }
}