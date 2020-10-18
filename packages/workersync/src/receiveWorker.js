import { PeerSync } from '@AssetSync/PeerSync'

class ProxyReceiver extends PeerSync {
    constructor() {
        super((...data) => { self.postMessage(...data) }, self.onmessage)
    }
}

export function receiveWorker(init) {
    const proxy = new ProxyReceiver()

    proxy.addListener('start', (data) => {
        proxy.removeListener('start')
        init({
            canvas: data.canvas,
            inputElement: this,
            userData: data.userData
        })
    })
}