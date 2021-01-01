'use strict'

const mergeObjects = require('merge-options')

module.exports = ({ peerId, repo, keychainConfig = {}, libp2pConfig }) => {
  const { datastore, keys } = repo

  const libp2pOptions = {
    datastore,
    peerId,
    keychain: {
      datastore: keys,
      ...keychainConfig
    }
  }

  const Libp2p = require('libp2p')

  return new Libp2p(mergeObjects(libp2pOptions, libp2pConfig))
}