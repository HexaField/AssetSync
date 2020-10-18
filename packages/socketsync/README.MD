# Socket Sync

Allows you to send arbitrary buffers and message between nodejs and the browser using secure WebSockets

*Disclaimer:* this is a work in progress - ideas, context and implementation details may and will change

## API

`async initialise(forceSlave: boolean, websocketPort: string): boolean`