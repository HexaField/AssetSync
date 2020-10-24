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

    addFunction(func) {
        this[func] = (...args) => {
            this.sendEvent({ type: func, args: [...args] })
        }
    }
}

export function receiveWorker() {
    const proxy = new WorkerThreadProxy()
    proxy.sendEvent({ type: 'init' })
    return proxy
}