import { EventEmitter } from 'events'
import WebSocket from 'ws'

export default class WebSocketServer extends EventEmitter {
    constructor(args = {}) {
        super()
        this.onConnect = this.onConnect.bind(this)
        this.webSocket = new WebSocket.Server({
            port: args.port || 19843
        })

        this.webSocket.on('connection', (ws) => { this.onConnect(ws); })
        this.webSocket.on('error', (error) => { this.onDisconnect(error.message); })
        this.webSocket.on('close', () => { this.onDisconnect(false) })
    }

    onDisconnect(error) {
        if (this.heartbeat !== undefined) {
            clearInterval(this.heartbeat);
        }
        if (!this.connection) return
        this.connection = undefined
        this.emit('disconnect', error)
    }

    onConnect(ws) {

        ws.on('message', (data) => this.emit('message', data))
        this.connection = ws
        console.log('WebSocketServer: Successfully connected to client!')

        ws.isAlive = true;

        ws.on('pong', () => {
            ws.isAlive = true;
        });

        this.heartbeat = setInterval(() => {
            if (!this.webSocket.clients.has(ws))
                this.onDisconnect()
            this.webSocket.clients.forEach((ws) => {
                if (ws.isAlive === false) {
                    return ws.terminate();
                }
                ws.isAlive = false;
                ws.ping('ping!');
            });
        }, 1000);
    }

    sendMessage(data) {
        if (this.connection)
            this.connection.send(JSON.stringify(data))
    }
}