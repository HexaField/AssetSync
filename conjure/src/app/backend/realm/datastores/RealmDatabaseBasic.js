
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

export default async (realmDatabase, onProgress, shouldSync) => {
    return new Promise(async (resolve) => {
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

        realmDatabase._stopDatastores = async () => {
            await datastoreObjects.close()
            await datastoreMetadata.close()
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
                await setLastSynced()
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
                await setLastSynced()
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

        const startSync = async (peerID) => {
            onProgress('Syncing from ' + peerID + '. Requesting keys...')
            realmDatabase.sendTo(peerID, OPCODES_SYNCED_DATABASE.requestKeys, await getLastSynced())
        }
        let resolved = false

        const finishSync = () => {
            if(!resolved) {
                resolved = true
                resolve()
            }
        }

        realmDatabase.network.on('onPeerJoin', async (peerID) => {
            if(shouldSync && !resolved)
                startSync(peerID)
        })
        
        realmDatabase.network.on('onPeerLeave', (peerID) => { })

        // content = lastUpdated
        realmDatabase.on(OPCODES_SYNCED_DATABASE.requestKeys, async (content, peerID) => {
            onProgress('Received request for keys', content)
            // if(content < await getLastSynced())
                realmDatabase.sendTo(peerID, OPCODES_SYNCED_DATABASE.receiveKeys, await getAllKeysAndTimes())
        })

        // content = { key: timeReceived }
        realmDatabase.on(OPCODES_SYNCED_DATABASE.receiveKeys, async (content, peerID) => {
            onProgress('Requesting entries for', content)
            if(Object.keys(content).length) {
                realmDatabase.sendTo(peerID, OPCODES_SYNCED_DATABASE.requestEntries, await getDifferences(content))
            } else {
                // nothing to update, so we are synced
                await setLastSynced()
                if(shouldSync) {
                    finishSync()
                }
            }
        })

        // content = [...key]
        realmDatabase.on(OPCODES_SYNCED_DATABASE.requestEntries, async (content, peerID) => {
            onProgress('Received request for entries', ...content)
            // if(Array.isArray(content) && content.length)
            realmDatabase.sendTo(peerID, OPCODES_SYNCED_DATABASE.receiveEntries, await getEntriesByKeys(content))
        })

        // content = [...{ key, value }]
        realmDatabase.on(OPCODES_SYNCED_DATABASE.receiveEntries, async (content, peerID) => {
            onProgress('Updating entries for', content)
            for (let entry of content) {
                await realmDatabase._put(entry.key, entry.value, entry.timeReceived)
                realmDatabase.emit(NETWORKING_OPCODES.OBJECT.RECEIVE, { uuid: entry.key, data: entry.value })
            }

            // we are now up to do
            await setLastSynced()
            if(shouldSync) {
                finishSync()
            }
        })

        async function getAllKeysAndTimes() {
            const map = {}
            const local = await realmDatabase._getAllLocal()
            if(local.length) {
                local.forEach(({ key, value, timeReceived }) => {
                    map[key] = timeReceived
                })
            }
            return map
        }

        async function getEntriesByKeys(keys = []) {
            let entries = []
            for (let key of keys) {
                if(typeof key === 'string' && key !== '') {
                    entries.push(await realmDatabase._get(key))
                }
            }
            return entries
        }

        // TODO: figure out who to get this data from
        // listOfKeys = [{ key, timeReceived }, ...]
        async function getDifferences(entries) {
            let neededKeys = []
            const myEntries = await getAllKeysAndTimes()

            const differences = diff(
                Object.keys(myEntries).sort(),
                Object.keys(entries).sort()
            )
            
            differences.added.forEach((key) => {
                neededKeys.push(key)
            })
            differences.removed.forEach(async (key) => {
                await realmDatabase._put(key, '', entries[key])
            })
            differences.common.forEach(async (key) => {
                if (myEntries[key] > entries[key]) {
                    neededKeys.push(key)
                }
            })
            return neededKeys
        }

        if(!shouldSync) {
            finishSync()
        }
    })
}