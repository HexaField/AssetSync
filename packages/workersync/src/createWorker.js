import { getCircularReplacer, simplifyObject } from '@AssetSync/common'
import { PeerSync } from '@AssetSync/PeerSync'
import { EventEmitter } from 'events'

class WorkerMainProxy extends PeerSync {
    constructor(worker) {
        super()

        this.worker = worker

        const eventEmitter = new EventEmitter()
        worker.onmessage = (message) => { eventEmitter.emit('message', message.data) }
        this.setMessageHandlers((...data) => { worker.postMessage(...data) }, eventEmitter)


        this.onEvent = this.onEvent.bind(this)
    }

    onEvent(event) {
        this.sendEvent(simplifyObject(event))
    }
}

export async function createWorker(workerURL) {
    const worker = new Worker(workerURL, { type: 'module' })
    worker.postMessage('');
    const proxy = new WorkerMainProxy(worker)
    return proxy
}
