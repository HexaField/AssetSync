import { Requester } from './Requester.js'

export class InlineWorker {
    constructor(funcObj) {
        const blobURL = URL.createObjectURL(new Blob(['(', funcObj.toString(), ')()'], { type: 'application/javascript' }))
        const worker = new Worker(blobURL);
        URL.revokeObjectURL(blobURL);


        this.requester = new Requester((args) => {
            worker.postMessage(args)
        })

        worker.onmessage = (message) => {
            this.requester.receiveReply(message.data)
        }
    }

    async makeRequest(args) {
        return await this.requester.request('', args)
    }
}
