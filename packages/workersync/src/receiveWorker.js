import { PeerSync } from '@AssetSync/PeerSync'
import { EventEmitter } from 'events'

class WorkerThreadProxy extends PeerSync {
    constructor() {
        super()
        const eventEmitter = new EventEmitter()
        self.onmessage = (message) => { eventEmitter.emit('message', message.data)}
        this.setMessageHandlers((...data) => { self.postMessage(...data) }, eventEmitter)
    }
}

export function receiveWorker(init) {
    const proxy = new WorkerThreadProxy()

    proxy.addListener('start', (data) => {
        proxy.removeAllListeners('start')
        init({
            canvas: data.canvas,
            peerSync: proxy
        })
    })

    proxy.addListener('size', (data) => {
        proxy.clientWidth = data.width
        proxy.clientHeight = data.height
    })

    return proxy
}