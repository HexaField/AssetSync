import { EventEmitter } from "events"

export default class WebSocketClient extends EventEmitter {
    constructor(args = {}) {
        super()

        try {
            this.webSocket = new WebSocket('ws://localhost:' + (args.port || '19843'))

            this.webSocket.onopen = () => this.emit('connect')
            this.webSocket.onerror = (error) => this.emit('disconnect', error)
            this.webSocket.onmessage = (data) => this.emit('message', data)
            this.webSocket.onclose = (error) => this.emit('disconnect', error)

        } catch (error) { }

        window.addEventListener("beforeunload", (e) => {
            e.preventDefault();
            // e.returnValue = '';
            console.log('Shutting down!')
            this.emit('disconnect')
        });
    }

    sendMessage(data) {
        this.webSocket.send(JSON.stringify(data))
    }
}