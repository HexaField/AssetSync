# Asset Sync

Asset Sync is a peer to peer networking utility that gives your web applications all the necessary data communication and storage features for a truly decentralised Web 3.0

## Features

- Network and database interfaces
- Peer to peer messaging & data streams
- A database / application architecture instead of client / server
- Nodejs application to offload from browser (connected via local WebSockets)
- ILP Libp2p transport support to enable secure streamed payments
- Decentralised databases built on a key/value store, such as a DHT
- Decentralised immediately consistent storage using local disk, memory & pubsub messaging
- A file system wrapper for databases

## To Do

### rewrite a better ipfs-pubsub-room

it's more complicated than it needs to be

needs to emit messages on join, leave, messages using pubsub

same for a private connection using dialProtocol of sendTo