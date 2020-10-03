# Asset Sync

Asset Sync is a peer to peer data utility that gives your web applications all the necessary communication and storage features for a truly decentralised Web 3.0

---

## API Features

- Network and database interfaces
- Peer to peer messaging, payment & data streams
- NodeJS server to offload workload from browser (connected via local WebSockets) and act as headless application node
- ILP STREAM p2p network support to enable secure streamed payments
- Decentralised databases built on a key/value store, such as a DHT
- Decentralised immediately consistent storage using local disk, memory & pubsub messaging
- A file system wrapper for databases

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

## Run

``

git clone https://github.com/HexaField/AssetSync.git

cd AssetSync

yarn install

yarn example

``
