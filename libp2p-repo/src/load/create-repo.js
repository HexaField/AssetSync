'use strict'

const Libp2pRepo = require('../')
// const os = require('os')
// const path = require('path')

/**
 * @param {Object} [options]
 * @param {string} [options.path]
 * @param {boolean} [options.silent]
 * @param {boolean} [options.autoMigrate]
 * @returns {Repo}
 */
module.exports = (options = {}) => {
  const repoPath = options.path// || path.join(os.homedir(), '.libp2p')
  let lastMigration = null

  const onMigrationProgress = (version, percentComplete, message) => {
    if (version !== lastMigration) {
      lastMigration = version

      console.info(`Migrating repo from v${version - 1} to v${version}`) // eslint-disable-line no-console
    }

    console.info(`${percentComplete.toString().padStart(6, ' ')}% ${message}`) // eslint-disable-line no-console
  }

  return new Libp2pRepo(repoPath, {
    autoMigrate: options.autoMigrate,
    onMigrationProgress: options.silent ? null : onMigrationProgress
  })
}

/**
 * @typedef {import('../interface/repo').Repo<IPFSConfig>} Repo
 * @typedef {import('../components/config').IPFSConfig} IPFSConfig
 */
