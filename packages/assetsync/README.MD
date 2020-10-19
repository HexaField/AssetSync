# Asset Sync

Asset Sync is a peer to peer data utility that gives your web applications all the necessary communication and storage features for a truly decentralised Web 3.0

*Disclaimer:* this is a work in progress - ideas, context and implementation details may and will change

---

## Current Features

- Network and database interfaces
- Peer to peer messaging
- A file system wrapper for databases

## Planned Features

- Decentralised immediately consistent storage using local disk, memory & pubsub messaging
- Decentralised databases built on a key/value store, such as a DHT
- Ring signature plugin
- Zero knowledge proof plugin
- ILP & PayID payments
- ILP STREAM p2p network support to enable secure streamed payments & data

---

## Plugins

### Transport

- a base class for transport plugins

### Libp2p (Transport)

- provides a simple API for pubsub & direct messaging via Libp2p

### Network

- requires a transport plugin

### File Storage

- node storage on file system
- browser storage in IndexedDB

## API

### Example

```javascript
import AssetSync, { StoragePlugin } from '@AssetSync/AssetSync'

const assetSync = new AssetSync()
const storagePlugin = new StoragePlugin()

await assetSync.register({ storagePlugin })
await assetSync.initialise()

assetSync.storagePlugin.exists('file.txt')
```