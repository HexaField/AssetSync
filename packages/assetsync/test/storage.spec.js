import test from 'ava'
import Peer from './storage/peer.js'

const peer = new Peer({ rootDirectory: process.cwd() })
await peer.start()

test.serial('can make directory', async t => {
    const success = await peer.storagePlugin.makeDirectory('/testdir/')
    t.true(success)
})

const fileData = Math.random().toString(36)

test.serial('can write file', async t => {
    const success = await peer.storagePlugin.writeFile('/testdir/test.txt', fileData)
    t.true(success)
})

test.serial('can read file', async t => {
    const data = await peer.storagePlugin.readFile('/testdir/test.txt')
    t.assert(data, fileData)
})

test.serial('can remove file', async t => {
    const data = await peer.storagePlugin.removeFile('/testdir/test.txt')
    t.true(data)
})

test.serial('can remove directory', async t => {
    const data = await peer.storagePlugin.removeDirectory('/testdir')
    t.true(data)
})


// test('can bulk write', async t => {

// })

// test('can read folder', async t => {

// })