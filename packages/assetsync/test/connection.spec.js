import test from 'ava'
import Peer from './connection/peer.js'
import wrtc from 'wrtc'
import { BufferSchema, Model } from '@geckos.io/typed-array-buffer-schema'
import { float64 } from '@geckos.io/typed-array-buffer-schema'

const peer1 = new Peer({ wrtc: wrtc })
await peer1.start()

const peer2 = new Peer({ wrtc: wrtc })
await peer2.start()

const testSchema = BufferSchema.schema('test', {
    testFloat: float64
})

const testModel = new Model(testSchema)

const data = {
    testFloat: Math.random()
}

test.serial('can make connection and send data', t => {
    return new Promise(async (resolve) => {
        const conn1 = await peer1.connectionPlugin.createConnection('peer2', true)
        const conn2 = await peer2.connectionPlugin.createConnection('peer1')
        
        await conn2.signal(conn1.peerData)
        
        if(!await conn1.connect(conn2.peerData)) {
            console.log("Cannot connect to peer 2!")
            resolve()
        }
        if(!await conn2.connect(conn1.peerData)) {
            console.log("Cannot connect to peer 1!")
            resolve()
        }

        conn2.on('message', message => {
            resolve(message)
        })

        const buffer = testModel.toBuffer(data)

        conn1.send(new Uint8Array(buffer))

    }).then((result) => {
        const testData = testModel.fromBuffer(result.buffer)
        t.deepEqual(data, testData)
    })
})