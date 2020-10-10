# Asset Sync

Asset Sync is a peer to peer data utility that gives your web applications all the necessary communication and storage features for a truly decentralised Web 3.0

*Disclaimer:* this is a work in progress - ideas, context and implementation details may and will change

---

## Current Features

- Network and database interfaces
- Peer to peer messaging
- A file system wrapper for databases

## Planned Features

- ILP & PayID payments
- ILP STREAM p2p network support to enable secure streamed payments & data
- Decentralised databases built on a key/value store, such as a DHT
- Decentralised immediately consistent storage using local disk, memory & pubsub messaging

---

## Plugins

### IPFS

- if you are just using the networking plugin

*TODO*

- add option to use just libp2p

### Network

- requires IPFS plugin
- provides NetworkInterface class with basic networking protocol functionality

*TODO*

- make generic & not rely on libp2p

### File Storage

- node storage on file system
- browser storage in IndexedDB

*TODO*

- 