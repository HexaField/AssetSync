import test from 'ava'
import Peer from './connection/peer.js'
import wrtc from 'wrtc'
import { BufferSchema, Model, float64 } from '@geckos.io/typed-array-buffer-schema'

const peer1 = new Peer({ wrtc: wrtc })
await peer1.start()

const peer2 = new Peer({ wrtc: wrtc })
await peer2.start()

const testSchema = BufferSchema.schema('test', {
    testFloat: float64
})

const testModel = new Model(testSchema)

const data1 = {
    testFloat: Math.random()
}

const data2 = {
    testFloat: Math.random()
}

test.serial('can make connection and send data', t => {
    return new Promise(async (resolve) => {
        const conn1 = await peer1.connectionPlugin.createConnection('peer2', true)
        const conn2 = await peer2.connectionPlugin.createConnection('peer1')
        
        conn1.on('ready', () => {
            console.log('Connected peer 1 to peer 2.')
        })

        conn2.on('ready', () => {
            console.log('Connected peer 2 to peer 1.')
            const buffer1 = testModel.toBuffer(data1)
            conn1.send(new Uint8Array(buffer1))
        })

        conn2.on('message', message1 => {
            const result = [message1]

            conn1.on('message', message2 => {
                result.push(message2)
                resolve(result)
            })

            const buffer2 = testModel.toBuffer(data2)
            conn2.send(new Uint8Array(buffer2))
        })

        conn2.signal(conn1.peerData)
        conn2.on('signal', () => {
            conn1.signal(conn2.peerData)
        })
        

    }).then((result) => {
        const testData1 = testModel.fromBuffer(result[0].buffer)
        const testData2 = testModel.fromBuffer(result[1].buffer)
        t.deepEqual(data1, testData1)
        t.deepEqual(data2, testData2)
    })
})