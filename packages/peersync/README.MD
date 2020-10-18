# Peer Sync

Allows you to send arbitrary data between contexts as buffers, requests or events

*Disclaimer:* this is a work in progress - ideas, context and implementation details may and will change

## API

`setMessageHandlers(sendMessage: function, onMessage: EventEmitter): null`

`sendMessage(message: any, ...buffers: array[buffer]): null`

`sendEvent(event: string, args: any, ...buffers: array[buffer]): null`

`async makeRequest(opcode: string, data: any): any`

`addRequestOpcode(key: string, value: any): null`

`addRequestOpcodes(obj: object): null`

```javascript
obj = {
    opcode1: (data) => { },
    opcode2: (data) => { },
}
```
`removeRequestOpcode(key: string): null`
