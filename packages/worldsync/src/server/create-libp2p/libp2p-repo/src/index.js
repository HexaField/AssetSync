'use strict'

const debug = require('debug')
const Big = require('bignumber.js')
const errcode = require('err-code')
const bytes = require('bytes')
const pathJoin = require('ipfs-utils/src/path-join')

const backends = require('./backends')
const version = require('./version')
const config = require('./config')
const spec = require('./spec')
const apiAddr = require('./api-addr')
const defaultOptions = require('./default-options')
const ERRORS = require('./errors')
const { isNode } = require('ipfs-utils/src/env')

const log = debug('libp2p:repo')

const noLimit = Number.MAX_SAFE_INTEGER
const AUTO_MIGRATE_CONFIG_KEY = 'repoAutoMigrate'

const lockers = {
  memory: require('./lock-memory'),
  fs: require('./lock')
}

/**
 * Libp2pRepo implements all required functionality to read and write to an libp2p repo.
 */
class Libp2pRepo {
  /**
   * @param {string} repoPath - path where the repo is stored
   * @param {Object} options - Configuration
   * @param {number} options.repoVersion - current repo version - outdated or updated repos will be migrated or reverted if possible
   */
  constructor (repoPath, options = {}) {
    if (typeof repoPath !== 'string') {
      throw new Error('missing repoPath')
    }

    this.options = buildOptions(options)
    this.repoVersion = this.options.repoVersion || 9 // hardcoded until figure out what to do
    this.closed = true
    this.path = repoPath

    this._locker = this._getLocker()

    this.root = backends.create('root', this.path, this.options)
    this.version = version(this.root)
    this.config = config(this.root)
    this.spec = spec(this.root)
    this.apiAddr = apiAddr(this.root)

    this.migrator = this.options.migrator || {
      revert: async (path, repoOptions, toVersion, { ignoreLock, onProgress, isDryRun}) => {
        this.version.set(toVersion)
      },
      migrate: async (path, repoOptions, toVersion, { ignoreLock, onProgress, isDryRun}) => {
        this.version.set(toVersion)
      }
    }
    this._datastores = {}
  }

  /**
   * Initialize a new repo.
   *
   * @param {Object} options
   * @param {stirng} options.config - config to write into `config`.
   * @param {string} options.spec - config to write into `spec`.
   * @returns {Promise<void>}
   */
  async init (options) {
    log('initializing at: %s', this.path)
    await this._openRoot()
    await this.config.set(options.config || {})
    await this.spec.set(options.spec || {})
    await this.version.set(this.repoVersion)
  }

  /**
   * Check if the repo is already initialized.
   *
   * @returns {Promise<boolean>}
   */
  async isInitialized () {
    if (!this.closed) {
      // repo is open, must be initialized
      return true
    }

    try {
      // have to open the root datastore in the browser before
      // we can check whether it's been initialized
      await this._openRoot()
      await this._checkInitialized()
      await this.root.close()

      return true
    } catch (err) {
      // FIXME: do not use exceptions for flow control
      return false
    }
  }

  /**
   * Open a datastore and assigns it to repo
   * @param {string} name
   * @param {Object} storageBackends
   * @param {Object} storageBackendOptions
   * @returns {datastore-interface}
   */
  async openDatastore(name, storageBackend, storageBackendOptions) {
    try {
      const datastore = backends.create(name, pathJoin(this.path, name), { storageBackends: { [name]: storageBackend }, storageBackendOptions: storageBackendOptions || {} } )
      await datastore.open()
      this._datastores[name] = datastore // store the name as a reference to the store, use this[name] to retrieve the store
      this[name] = datastore
      return datastore
    } catch(error) {
      throw error
    }
  }

  async closeDatastore(name) {

    if(!this._datastores[name]) {
      throw new Error('database is not open')
    }

    try {
      await this[name].close()
      delete this._datastores[name]
      delete this[name]
    } catch(error) {
      throw error
    }
  }

  /**
   * Open the repo. If the repo is already open an error will be thrown.
   * If the repo is not initialized it will throw an error.
   *
   * @returns {Promise<void>}
   */
  async open () {
    if (!this.closed) {
      throw errcode(new Error('repo is already open'), ERRORS.ERR_REPO_ALREADY_OPEN)
    }
    log('opening at: %s', this.path)

    // check if the repo is already initialized
    try {
      await this._openRoot()
      await this._checkInitialized()
      this.lockfile = await this._openLock(this.path)
      log('acquired repo.lock')

      const isCompatible = await this.version.check(this.repoVersion)

      if (!isCompatible) {
        if (await this._isAutoMigrationEnabled()) {
          await this._migrate(this.repoVersion)
          // throw new Error('migration not yet implemented - migrate manually')
        } else {
          throw new ERRORS.InvalidRepoVersionError('Incompatible repo versions. Automatic migrations disabled. Please migrate the repo manually.')
        }
      }

      await this.openDatastore('keys', isNode ? require('datastore-fs') : require('datastore-level'), isNode ? {} : {
        sharding: false,
        prefix: '',
        version: 2
      })

      this.closed = false
      log('all opened')
    } catch (err) {
      if (this.lockfile) {
        try {
          await this._closeLock()
          this.lockfile = null
        } catch (err2) {
          log('error removing lock', err2)
        }
      }

      throw err
    }
  }

  /**
   * Returns the repo locker to be used. Null will be returned if no locker is requested
   *
   * @private
   * @returns {Locker}
   */
  _getLocker () {
    if (typeof this.options.lock === 'string') {
      if (!lockers[this.options.lock]) {
        throw new Error('Unknown lock type: ' + this.options.lock)
      }
      return lockers[this.options.lock]
    }

    if (!this.options.lock) {
      throw new Error('No lock provided')
    }
    return this.options.lock
  }

  /**
   * Opens the root backend, catching and ignoring an 'Already open' error
   *
   * @returns {Promise}
   */
  async _openRoot () {
    try {
      await this.root.open()
    } catch (err) {
      if (err.message !== 'Already open') {
        throw err
      }
    }
  }

  /**
   * Creates a lock on the repo if a locker is specified. The lockfile object will
   * be returned in the callback if one has been created.
   *
   * @param {string} path
   * @returns {Promise<lockfile>}
   */
  async _openLock (path) {
    const lockfile = await this._locker.lock(path)

    if (typeof lockfile.close !== 'function') {
      throw errcode(new Error('Locks must have a close method'), 'ERR_NO_CLOSE_FUNCTION')
    }

    return lockfile
  }

  /**
   * Closes the lock on the repo
   *
   * @returns {Promise<void>}
   */
  _closeLock () {
    return this.lockfile.close()
  }

  /**
   * Check if the repo is already initialized.
   *
   * @private
   * @returns {Promise}
   */
  async _checkInitialized () {
    log('init check')
    let config
    try {
      [config] = await Promise.all([
        this.config.exists(),
        this.spec.exists(),
        this.version.exists()
      ])
    } catch (err) {
      if (err.code === 'ERR_NOT_FOUND') {
        throw errcode(new Error('repo is not initialized yet'), ERRORS.ERR_REPO_NOT_INITIALIZED, {
          path: this.path
        })
      }

      throw err
    }

    if (!config) {
      throw errcode(new Error('repo is not initialized yet'), ERRORS.ERR_REPO_NOT_INITIALIZED, {
        path: this.path
      })
    }
  }

  /**
   * Close the repo and cleanup.
   *
   * @returns {Promise<void>}
   */
  async close () {
    if (this.closed) {
      throw errcode(new Error('repo is already closed'), ERRORS.ERR_REPO_ALREADY_CLOSED)
    }
    log('closing at: %s', this.path)

    try {
      // Delete api, ignoring irrelevant errors
      await this.apiAddr.delete()
    } catch (err) {
      if (err.code !== ERRORS.ERR_REPO_NOT_INITIALIZED && !err.message.startsWith('ENOENT')) {
        throw err
      }
    }

    await Promise.all([
      this.root,
      ...Object.values(this._datastores)
    ].map((store) => store.close()))

    log('unlocking')
    this.closed = true
    await this._closeLock()
    this.lockfile = null
  }

  /**
   * Check if a repo exists.
   *
   * @returns {Promise<bool>}
   */
  async exists () { // eslint-disable-line require-await
    return this.version.exists()
  }

  /**
   * Get repo status.
   *
   * @returns {Object}
   */
  async stat () {
    const [storageMax, version, ...datastores] = await Promise.all([
      this._storageMaxStat(),
      this.version.get(),
      ...Object.values(this._datastores).map((datastore) => getSize(datastore))
    ])
    
    const size = new Big(0)
    datastores.forEach((datastore) => size.plus(datastore))

    return {
      repoPath: this.path,
      storageMax,
      version: version,
      // numObjects: blocks.count,
      repoSize: size
    }
  }

  async _isAutoMigrationEnabled () {
    if (this.options.autoMigrate !== undefined) {
      return this.options.autoMigrate
    }

    let autoMigrateConfig
    try {
      autoMigrateConfig = await this.config.get(AUTO_MIGRATE_CONFIG_KEY)
    } catch (e) {
      if (e.code === ERRORS.NotFoundError.code) {
        autoMigrateConfig = true // Config's default value is True
      } else {
        throw e
      }
    }

    return autoMigrateConfig
  }

  async _migrate (toVersion) {
    const currentRepoVersion = await this.version.get()

    if (currentRepoVersion > toVersion) {
      log('reverting to version ' + toVersion)
      return this.migrator.revert(this.path, this.options, toVersion, {
        ignoreLock: true,
        onProgress: this.options.onMigrationProgress
      })
    } else {
      log('migrating to version ' + toVersion)
      return this.migrator.migrate(this.path, this.options, toVersion, {
        ignoreLock: true,
        onProgress: this.options.onMigrationProgress
      })
    }
  }

  async _storageMaxStat () {
    try {
      const max = await this.config.get('Datastore.StorageMax')
      return new Big(bytes(max))
    } catch (err) {
      return new Big(noLimit)
    }
  }
}

async function getSize (queryFn) {
  const sum = new Big(0)
  for await (const block of queryFn.query({})) {
    sum.plus(block.value.byteLength)
      .plus(block.key.uint8Array().byteLength)
  }
  return sum
}

module.exports = Libp2pRepo
module.exports.errors = ERRORS
module.exports.startRepo = require('./load')

function buildOptions (_options) {
  const options = Object.assign({}, defaultOptions, _options)

  options.storageBackends = Object.assign(
    {},
    defaultOptions.storageBackends,
    options.storageBackends)

  options.storageBackendOptions = Object.assign(
    {},
    defaultOptions.storageBackendOptions,
    options.storageBackendOptions)

  return options
}