import { getCircularReplacer, simplifyObject } from '@AssetSync/common'
import { PeerSync } from '@AssetSync/PeerSync'

class ElementProxy extends PeerSync {
    constructor(worker) {
        super((...data) => { worker.postMessage(...data) }, worker.onmessage)
        this.worker = worker
        this.start = this.start.bind(this)
        this.sendSize = this.sendSize.bind(this)
    }

    sendSize() {
        // this.sendEvent({
        //     type: 'size',
        //     width: this.element.clientWidth,
        //     height: this.element.clientHeight,
        // });
    }


    start(canvas) {

        if (canvas.transferControlToOffscreen) { // make sure our browser supports offscreencanvas

            const offscreen = canvas.transferControlToOffscreen()
            this.canvas = canvas

            this.sendMessage({
                type: 'start',
                canvas: offscreen
            }, [offscreen])

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
