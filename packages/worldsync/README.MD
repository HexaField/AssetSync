# World Sync

World Sync is a fully decentralised peer to peer javascript game engine enabling high performance video games to run on node and in the browser.

*Disclaimer:* this is a work in progress - ideas, context and implementation details may and will change

---

## Architecture

World Sync is split into your traditional server & client architecture, except that both the server and the client run on the user's machine. Network and compute load balancing is distributed among all the peers relative to the throughput they are able and wanting to handle.

## Contexts

World Sync allows you to run your game both natively in the browser, as well as entirely as a standalone application, or distibuted across both. In this case, the client runs in the browser and the server runs as an application.

## Core features

What makes World Sync stand out from any other engine?
- fully decentralised 
  - you only have to host a rendezvous server, or simply a list of trusted peer nodes
- runs entirely in the browser better than any other
- supports scene compilation
  - pre-load and run other scenes in the background for near-instant transition
  - optionally support the network by providing some load balancing for scenes the client isn't in

### Server

- Asset Sync
  - Controls the flow of data between the server and other users

- World Controller
  - Where all update logic occurs
  - Manages the scene graphs
  - Threaded physics
  - Multiple scenes can be handled and managed by using multiple scenes under a master scene **TO BE TESTED*

- World Compiler
  - Compiles the world, GUI and any other components

- UI
  - Handles GUI
  - Pipes controls to world controller
  - Pipes GUI to world compiler

- Graphics Renderer
  - Renders the compiled scene
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
