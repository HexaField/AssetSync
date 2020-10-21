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

        this.start = this.start.bind(this)
        this.sendSize = this.sendSize.bind(this)

        this.onEvent = this.onEvent.bind(this)
    }

    onEvent(event) {
        this.sendEvent(simplifyObject(event))
    }

    sendSize() {
        this.sendEvent({
            type: 'size',
            width: this.canvas.clientWidth,
            height: this.canvas.clientHeight,
        })
    }

    start(canvas, config) {
        if (canvas.transferControlToOffscreen) { // make sure our browser supports offscreencanvas

            const offscreen = canvas.transferControlToOffscreen()
            this.canvas = canvas
            this.sendSize()
            this.sendEvent({ type: 'start', canvas: offscreen, devicePixelRatio: window.devicePixelRatio, config }, [offscreen])
            window.addEventListener('resize', this.sendSize)

            this.addEventListener('addEventListener', (event) => {
                this.canvas.addEventListener(event.event, this.onEvent)
            })

            this.addEventListener('removeEventListener', (event) => {
                this.canvas.removeEventListener(event.event, this.onEvent)
            })
        }
    }
}

export function createWorker(workerURL) {
    const worker = new Worker(workerURL, { type: 'module' })
    worker.postMessage('');
    const proxy = new WorkerMainProxy(worker)
    return proxy
}
