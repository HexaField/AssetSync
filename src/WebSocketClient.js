import { EventEmitter } from "events"

export default class WebSocketClient extends EventEmitter {
    constructor(args = {}) {
        super()
        
        this.onMessage = this.onMessage.bind(this)

        try {
            this.webSocket = new WebSocket('ws://localhost:' + (args.port || '19843'))

            this.webSocket.onopen = () => this.emit('connect')
            this.webSocket.onerror = (error) => this.emit('disconnect', error)
            this.webSocket.onmessage = this.onMessage
            this.webSocket.onclose = (error) => this.emit('disconnect', error)

        } catch (error) { }

        window.addEventListener("beforeunload", (e) => {
            e.preventDefault();
            // e.returnValue = '';
            console.log('Shutting down!')
            this.emit('disconnect')
        });
    }

    onMessage(event) {
        let data = JSON.parse(event.data)
        try {

            if (data.requestTimestamp) // if this is a valid request
            {
                // call the callback function
                this.emit(data.requestTimestamp, data)

                // remove it from our list
                this.removeAllListeners(data.requestTimestamp)
            }
            else // this might be a one way event from
            {
                this.emit('message', data)
            }
        }
        catch (error) {
            console.log(error, event)
        }
    }

    sendData(data) {
        this.webSocket.send(JSON.stringify(data))
    }
}