import { generateUUID } from './generateUUID.js' 

export class Requester {
    constructor(sendRequest) {
        this.sendRequest = sendRequest
        this.replyCallbacks = {}
    }

    // creates a promise and waits for response
    async request(opcode, data) {
        const timestamp = generateUUID()

        return await new Promise((resolve, reject) => {

            const timer = setTimeout(10000, () => {
                delete this.replyCallbacks[timestamp]
                reject('PeerSync Requester: WebSocket request timed out')
            })

            this.addReplyListener(timestamp, (response) => {
                clearTimeout(timer)
                resolve(response.data)
            })

            this.sendRequest({ timestamp, opcode, data })

        })
    }

    receiveReply(data) {
        try {
            if (data.timestamp) {
                // call the callback function
                this.replyCallbacks[data.timestamp](data)

                // remove it from our list
                delete this.replyCallbacks[data.timestamp]
            }
        } catch (error) {
            console.log(error, data, this.replyCallbacks)
        }
    }

    addReplyListener(timestamp, callback) {
        this.replyCallbacks[timestamp] = callback
    }
}