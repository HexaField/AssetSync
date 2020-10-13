# AssetSync basic setup

## Install

navigate to this folder

`cd example/assetsync`

```
yarn install
yarn start
```

## Play around

`await assetSync.registerPlugin(websocketPlugin)`

Registering the websocket plugin will connect the browser and node as one

Turning off the websocket plugin will load AssetSync in both node and the browser, and you will see the peers connect. Alternatively, you can load the example on another machine and see the peers connect via the websocket.