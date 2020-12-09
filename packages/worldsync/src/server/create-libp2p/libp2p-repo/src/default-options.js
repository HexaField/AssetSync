'use strict'

// Default configuration for a repo in node.js
module.exports = {
  repoVersion: 0,
  lock: 'fs',
  storageBackends: {
    root: require('datastore-fs')
  },
  storageBackendOptions: {
    root: {
      extension: ''
    }
  }
}
