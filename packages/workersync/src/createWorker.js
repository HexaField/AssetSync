import { getCircularReplacer, simplifyObject } from '@AssetSync/common'
import { PeerSync } from '@AssetSync/PeerSync'
import { EventEmitter } from 'events'

class ElementProxy extends PeerSync {
    constructor(worker) {
        super()

        this.worker = worker

        const eventEmitter = new EventEmitter()
        worker.onmessage = (message) => { eventEmitter.emit('message', message.data) }
        this.setMessageHandlers((...data) => { worker.postMessage(...data) }, eventEmitter)

        this.start = this.start.bind(this)
        this.sendSize = this.sendSize.bind(this)
    }

    sendSize() {
        this.sendEvent('size', {
            width: this.canvas.clientWidth,
            height: this.canvas.clientHeight,
        })
    }

    start(canvas) {
        if (canvas.transferControlToOffscreen) { // make sure our browser supports offscreencanvas

            const offscreen = canvas.transferControlToOffscreen()
            this.canvas = canvas
            this.sendEvent('start', { canvas: offscreen }, [offscreen])
            this.sendSize()
            window.addEventListener('resize', this.sendSize)
        }
    }
}

export function createWorker(workerURL) {
    const worker = new Worker(workerURL, { type: 'module' })
    worker.postMessage('');
    const proxy = new ElementProxy(worker)
    return proxy
}
