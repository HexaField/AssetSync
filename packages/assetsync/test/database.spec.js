import test from 'ava'
import { relay } from './utils.js'
import Peer from './synced_database/peer.js'
import createLibp2p, { config }  from './synced_database/create-libp2p.js'

await relay(config)

const node1 = await createLibp2p()
const node2 = await createLibp2p(node1)

const peer1 = new Peer(node1, process.cwd() + '/test/database-test/peer1/')
await peer1.start()

const peer2 = new Peer(node2, process.cwd() + '/test/database-test/peer2/')
await peer2.start()

test.serial('can add and remove database', async t => {
    
    const databaseID = Math.random().toString(36)

    const database1 = await peer1.syncedDatabasePlugin.addDatabase(databaseID)
    t.is(peer1.syncedDatabasePlugin.getDatabase(databaseID), database1)

    await peer1.syncedDatabasePlugin.removeDatabase(databaseID)
    t.is(peer1.syncedDatabasePlugin.getDatabase(databaseID), undefined)
})

test.serial('can add entry', async t => {

    const databaseID = Math.random().toString(36)
    const database1 = await peer1.syncedDatabasePlugin.addDatabase(databaseID)
    const database2 = await peer2.syncedDatabasePlugin.addDatabase(databaseID)
    
    const entry = { key: Math.random().toString(36), value: Math.random().toString(36) }

    return new Promise((resolve) => {4
        
        database2.on('entry:add', (entry) => {
            resolve(entry)
        })
        database1.addEntry(entry.key, entry.value)

    }).then((result) => {

        t.is(result.key, entry.key)
        t.is(result.value, entry.value)
        t.is(database2.getEntry(entry.key), entry.value)
        peer1.syncedDatabasePlugin.removeDatabase(databaseID)
        peer2.syncedDatabasePlugin.removeDatabase(databaseID)
    
    })
})

test.serial('can remove entry', async t => {

    const databaseID = Math.random().toString(36)
    const database1 = await peer1.syncedDatabasePlugin.addDatabase(databaseID)
    const database2 = await peer2.syncedDatabasePlugin.addDatabase(databaseID)
    
    const entry = { key: Math.random().toString(36), value: Math.random().toString(36) }

    return new Promise((resolve) => {
        
        database2.on('entry:remove', (entry) => {
            resolve(entry)
        })
        database1.addEntry(entry.key, entry.value)
        database1.removeEntry(entry.key)

    }).then((result) => {
        t.is(result.key, entry.key)
        t.is(database1.getEntry(entry.key), undefined)
        t.is(database2.getEntry(entry.key), undefined)
        peer1.syncedDatabasePlugin.removeDatabase(databaseID)
        peer2.syncedDatabasePlugin.removeDatabase(databaseID)

    })
})

test.serial.after.always(async () => {
    await peer1.storagePlugin.storage.files.rmdir(process.cwd() + '/test/database-test/', { recursive: true })
})
