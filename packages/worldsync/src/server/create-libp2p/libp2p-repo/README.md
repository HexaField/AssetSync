# WORK IN PROGRESS <!-- omit in toc -->

## Fork project from js-ipfs-repo <!-- omit in toc -->

The intention of this project is to create a generic repo implementation for libp2p projects

## To Do <!-- omit in toc -->

 - [x] dynamic loading of datastores
 - [x] new tests 
 - [x] implement loader & initialiser functions (similar to how IPFS utilises js-ipfs-repo)
 - [x] documentation

## Lead Maintainer <!-- omit in toc -->

[Josh Field](https://github.com/hexafield)

## Table of Contents <!-- omit in toc -->

- [Usage](#usage)
- [Loader](#loader)
- [API](#api)
  - [Setup](#setup)
    - [`new Repo(path[, options])`](#new-repopath-options)
    - [`Promise repo.init()`](#promise-repoinit)
    - [`Promise repo.open()`](#promise-repoopen)
    - [`Promise repo.close()`](#promise-repoclose)
    - [`Promise<boolean> repo.exists()`](#promiseboolean-repoexists)
    - [`Promise<Boolean> repo.isInitialized()`](#promiseboolean-repoisinitialized)
  - [Repos](#repos)
    - [`Promise repo.put(key, value:Uint8Array)`](#promise-repoputkey-valueuint8array)
    - [`Promise<Uint8Array> repo.get(key)`](#promiseuint8array-repogetkey)
  - [Custom Datastore](#custom-datastore)
    - [`repo.openDatastore`](#repoopendatastore)
    - [`repo.closeDatastore`](#repoclosedatastore)
  - [Config](#config)
    - [`Promise repo.config.set(key:String, value:Object)`](#promise-repoconfigsetkeystring-valueobject)
    - [`Promise repo.config.replace(value:Object)`](#promise-repoconfigreplacevalueobject)
    - [`Promise<?> repo.config.get(key:String)`](#promise-repoconfiggetkeystring)
    - [`Promise<Object> repo.config.getAll()`](#promiseobject-repoconfiggetall)
    - [`Promise<boolean> repo.config.exists()`](#promiseboolean-repoconfigexists)
  - [Version](#version)
    - [`Promise<Number> repo.version.get()`](#promisenumber-repoversionget)
    - [`Promise repo.version.set (version:Number)`](#promise-repoversionset-versionnumber)
  - [API Addr](#api-addr)
    - [`Promise<String> repo.apiAddr.get()`](#promisestring-repoapiaddrget)
    - [`Promise repo.apiAddr.set(value)`](#promise-repoapiaddrsetvalue)
  - [Status](#status)
    - [`Promise<Object> repo.stat()`](#promiseobject-repostat)
  - [Lock](#lock)
    - [`Promise lock.lock(dir)`](#promise-locklockdir)
    - [`Promise closer.close()`](#promise-closerclose)
    - [`Promise<boolean> lock.locked(dir)`](#promiseboolean-locklockeddir)

This provides a well defined interface for creating and interacting with a Libp2p repo.

## Usage

Example:

```js
const Repo = require('ipfs-repo')
const repo = new Repo('/tmp/ipfs-repo')

await repo.init({ cool: 'config' })
await repo.open()
```

## Loader

Example:

```js
const { startRepo } = require('ipfs-repo')
const { peerId, keychain, repo, print, isNew } = await startRepo({ repo: '.myRepo', libp2pConfig: { ... } })
```

## API

### Setup

#### `new Repo(path[, options])`

Creates an Libp2p Repo.

Arguments:

* `path` (string, mandatory): the path for this repo
* `options` (object, optional): may contain the following values
  * `autoMigrate` (bool, defaults to `true`): controls automatic migrations of repository.
  * `onMigrationProgress` (function(version, percentComplete, message)): callback function to be notified of migration progress
  * `lock` ([Lock](#lock) or string *Deprecated*): what type of lock to use. Lock has to be acquired when opening. string can be `"fs"` or `"memory"`.

```js
const repo = new Repo('path/to/repo')
```

#### `Promise repo.init()`

Creates the necessary folder structure inside the repo

#### `Promise repo.open()`

[Locks](https://en.wikipedia.org/wiki/Record_locking) the repo to prevent conflicts arising from simultaneous access

#### `Promise repo.close()`

Unlocks the repo.

#### `Promise<boolean> repo.exists()`

Tells whether this repo exists or not. Returned promise resolves to a `boolean`

#### `Promise<Boolean> repo.isInitialized()`

The returned promise resolves to `false` if the repo has not been initialized and `true` if it has

### Repos

Root repo:

#### `Promise repo.put(key, value:Uint8Array)`

Put a value at the root of the repo

* `key` can be a Uint8Array, a string or a [Key][]

#### `Promise<Uint8Array> repo.get(key)`

Get a value at the root of the repo

* `key` can be a Uint8Array, a string or a [Key][]

### Custom Datastore

#### `repo.openDatastore`

```javascript
await repo.openDatastore(
    'myDatastore',
    require('datastore-level'),
    {
        sharding: false,
        prefix: '',
        version: 2
    }
)
console.log('repo.myDatastore is ready')
```

#### `repo.closeDatastore`

```javascript
await repo.closeDatastore('myDatastore')
console.log('repo.myDatastore has been removed')
```

### Config

Instead of using `repo.set('config')` this exposes an API that allows you to set and get a decoded config object, as well as, in a safe manner, change any of the config values individually.

#### `Promise repo.config.set(key:String, value:Object)`

Set a config value. `value` can be any object that is serializable to JSON.

* `key` is a string specifying the object path. Example:

```js
await repo.config.set('a.b.c', 'c value')
const config = await repo.config.get()
assert.equal(config.a.b.c, 'c value')
```

#### `Promise repo.config.replace(value:Object)`

Set the whole config value. `value` can be any object that is serializable to JSON.

#### `Promise<?> repo.config.get(key:String)`

Get a config value. Returned promise resolves to the same type that was set before.

* `key` is a string specifying the object path. Example:

```js
const value = await repo.config.get('a.b.c')
console.log('config.a.b.c = ', value)
```

#### `Promise<Object> repo.config.getAll()`

Get the entire config value.

#### `Promise<boolean> repo.config.exists()`

Whether the config sub-repo exists.

### Version

#### `Promise<Number> repo.version.get()`

Gets the repo version (an integer).

#### `Promise repo.version.set (version:Number)`

Sets the repo version

### API Addr

#### `Promise<String> repo.apiAddr.get()`

Gets the API address.

#### `Promise repo.apiAddr.set(value)`

Sets the API address.

* `value` should be a [Multiaddr][] or a String representing a valid one.

### Status

#### `Promise<Object> repo.stat()`

Gets the repo status.

Returned promise resolves to an `Object` with the following keys:

- `numObjects`
- `repoPath`
- `repoSize`
- `version`
- `storageMax`

### Lock

Libp2p Repo comes with two built in locks: memory and fs. These can be imported via the following:

```js
const fsLock = require('ipfs-repo/src/lock')  // Default in Node.js
const memoryLock = require('ipfs-repo/src/lock-memory')  // Default in browser
```

You can also provide your own custom Lock. It must be an object with the following interface:

#### `Promise lock.lock(dir)`

Sets the lock if one does not already exist. If a lock already exists, should throw an error.

`dir` is a string to the directory the lock should be created at. The repo typically creates the lock at its root.

Returns `closer`, where `closer` has a `close` method for removing the lock.

#### `Promise closer.close()`

Closes the lock created by `lock.open`

If no error was thrown, the lock was successfully removed.

#### `Promise<boolean> lock.locked(dir)`

Checks the existence of the lock.

`dir` is the path to the directory to check for the lock. The repo typically checks for the lock at its root.

Returned promise resolves to a `boolean` indicating the existence of the lock.
