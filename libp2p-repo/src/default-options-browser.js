'use strict'

// Default configuration for a repo in the browser
module.exports = {
  repoVersion: 0,
  lock: 'memory',
  storageBackends: {
    root: require('datastore-level'),
  },
  storageBackendOptions: {
    root: {
      extension: '',
      prefix: '',
      version: 2
    }
  }
}
