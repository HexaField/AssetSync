# World Sync

World Sync is a fully decentralised peer to peer javascript game engine enabling high performance video games to run on node and in the browser.

*Disclaimer:* this is a work in progress - ideas, context and implementation details may and will change

---

## Core features

World Sync allows you to run your game both natively in the browser, as well as entirely as a standalone application, or distibuted across both. In this case, the client runs in the browser and the server runs as an application.

It runs fully decentralised, this means that the total compute load of simulating immersive virtual worlds is handled by the sum total of the peers instead of a centralised server system. You only need to host a rendezvous server, bootstrap nodes, or simply a list of external trusted peer nodes.

World Sync also supports continguous worlds - allowing multiple scenes to be loaded, simualted and even instantly traversable. Optionally support the network by providing some load balancing to broader scenes.

## Architecture

World Sync is split into your traditional server & client architecture, except that both the server and the client run on the user's machine. Network and compute load balancing is distributed among all the peers relative to the throughput they are able and wanting to handle.

### Server

- Asset Sync
  - Controls the flow of data between the server and other users

- Peer Sync
  - Allows you to run your server as a background process and your client in the browser 

- World Controller
  - Where all update logic occurs
  - Manages the scene graphs
  - Threaded physics
  - Chunking system
  - Multiple scenes can be handled and managed by using multiple scenes under a master scene

- World Compiler
  - Compiles the world, render targets, GUI and any other components

- UI
  - Handles input from the user (such as control schemes, keybindings etc.)
  - Manages the GUI system and pipes it to the World Compiler
  - Pipes controls to World Controller

- Graphics Renderer
  - Renders the scene
  - Applies post processing

### Client

- Input
  - Keyboard
  - Mouse

- Output
  - Audio
  - Canvas

- Audio renderer
  - Unfortunately if running in the browser, audio must originate from the main thread. This will be achieved by replicating the audio components of the compiled scene
  - Audio worklets may allow for improvements, but for now is out of the scope of this project

## API

```
createWorldSync({
    serverFile: string,
    serverFunc: function (isSlave: boolean, peerSync: PeerSync),
    client: function: (worldSync: WorldSync),
    canvas: OffscreenCanvas
}): WorldSync
```

## Resources
*todo*
- sirikata
- p2p game worlds paper