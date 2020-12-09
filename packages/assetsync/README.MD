# Asset Sync

Asset Sync is a peer to peer data utility that gives your web applications all the necessary communication and storage features for a truly decentralised Web 3.0

*Disclaimer:* this is a work in progress - ideas, context and implementation details may and will change

---

## Plugins

### Transport

- a base class for transport plugins

### Libp2p (Transport)

- add libp2p as a transport with a customisable configuration
- libp2p argument can be a function or instance

### Network

- requires a transport plugin
- provides a simple API for pubsub & direct messaging

### DHT

- get, set and query (todo) the DHT (only libp2p currently supported)

### File Storage

- node storage on file system
- browser storage in IndexedDB

**TODO**

- add timestamp checks for entries
- add tests for coherency across load & unload

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