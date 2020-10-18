# AssetSync

~ *Synchronising the metaverse* ~

*Disclaimer:* this is a work in progress - ideas, context and implementation details may and will change

This project is one half of [#ProjectConjure](https://info.conjure.world/)

[Join the conversation!](https://discord.com/invite/ExBxEN2)

## [Asset Sync](packages/AssetSync)

For your assets - data & payments

## [Peer Sync](packages/PeerSync)

Provides a simple interface for sending buffers, requests and events across a messaging context

## [Socket Sync](packages/SocketSync)

For connecting nodejs with the browser

## [Worker Sync](packages/WorkerSync)

For connecting workers to the DOM

## [World Sync](packages/WorldSync)

For your virtual worlds

## [Contributing](CONTRIBUTING.MD)

Please read the [contributing document](CONTRIBUTING.MD) if you would like to contribute!

## Progress

General

- [x] Unit tests (not comprehensive)
- [ ] Integration tests
- [ ] Migrate to typescript

PeerSync / SocketSync / WorkerSync / QUICSync

- [x] Messaging
- [x] Callbacks
- [x] Events
- [ ] Array Buffers

AssetSync

- [x] Basic plugin system
- [x] IPFS plugin
- [x] Network Plugin
- [x] File system plugin
- [ ] DHT plugin
- [ ] Synchronised database plugin
- [ ] QUIC network plugin 
- [ ] DHT plugin
- [ ] Crypto plugin
- [ ] ZKP plugin
- [ ] Ring Sig plugin
- [ ] ILP plugin
.

WorldSync

- [x] Basic client & server structure
- [x] Websocket messages and buffers with PeerSync
- [x] AssetSync integration
- [x] WebWorkers
- [ ] Example project running threejs, ammojs with networking
- [ ] Audio (worklets?)

more to come...