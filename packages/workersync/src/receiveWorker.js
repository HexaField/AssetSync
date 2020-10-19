import { PeerSync } from '@AssetSync/PeerSync'
import { EventEmitter } from 'events'

class WorkerThreadProxy extends PeerSync {
    constructor() {
        super()
        const eventEmitter = new EventEmitter()
        self.onmessage = (message) => { eventEmitter.emit('message', message.data) }
        this.setMessageHandlers((...data) => { self.postMessage(...data) }, eventEmitter)
    }

    addEventListener(event, listener) {
        super.addEventListener(event, listener)
        this.sendEvent({ type: 'addEventListener', event })
    }
    
    removeEventListener(event, listener) {
        super.removeEventListener(event, listener)
        this.sendEvent({ type: 'removeEventListener', event })
    }
}

const functions = [
    'focus'
]

export function receiveWorker() {
    const proxy = new WorkerThreadProxy()

    proxy.addEventListener('size', (data) => {
        proxy.clientWidth = data.width
        proxy.clientHeight = data.height
    })

    for(let func of functions) {
        proxy[func] = (...args) => {
            proxy.sendEvent({ type: func, args: [...args] })
        }
    }

    return new Promise((resolve) => {
        proxy.addEventListener('start', (data) => {
            proxy.devicePixelRatio = data.devicePixelRatio
            proxy.canvas = data.canvas
            proxy.ownerDocument = proxy;
            proxy.domElement = proxy
            self.global = proxy;
            self.document = proxy;
            self.window = proxy;

            resolve(proxy)
        })
    })
}