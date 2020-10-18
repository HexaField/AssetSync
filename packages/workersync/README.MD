# Worker Sync

Allows you to send arbitrary buffers and message between workers

*Disclaimer:* this is a work in progress - ideas, context and implementation details may and will change

## API

`createWorker(workerURL: string): WorkerMainProxy`

`receiveWorker(init: function({ canvas: OffscreenCanvas, peerSync: PeerSync })): null`