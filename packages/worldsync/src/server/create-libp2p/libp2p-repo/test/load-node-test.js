/* eslint max-nested-callbacks: ["error", 8] */
/* eslint-env mocha */
'use strict'

const { expect } = require('aegir/utils/chai')
// const sinon = require('sinon')
// const { isNode } = require('ipfs-utils/src/env')
// const tmpDir = require('ipfs-utils/src/temp-dir')
// const PeerId = require('peer-id')
// const { supportedKeys } = require('libp2p-crypto/src/keys')
// const Libp2p = require('libp2p')
const { startRepo } = require('../src/index')
// const mergeOptions = require('merge-options')
const defaultOptions =  require('./default-libp2p')

const repoLoc = 'test/repos/repo'

module.exports = (_repoCount) => {
    describe('create node', function () {

        it('can open same repo', async function () {
            this.timeout(80 * 1000)

            const tempRepo = await startRepo({ repo: repoLoc + _repoCount, libp2pConfig: defaultOptions() })

            const { peerId, keychain, repo, print, isNew } = tempRepo
            const peerId1 = repo.peerId
            await repo.close()

            const repo2 = await startRepo({ repo: repoLoc + _repoCount, libp2pConfig: defaultOptions() })
            const peerId2 = repo2.peerId
            await repo2.repo.close()
            expect(peerId1).to.deep.equal(peerId2)
            _repoCount++
        })

        // const node = await Libp2p.create(mergeOptions({
        //     peerId,
        //     keychain
        // }, defaultOptions))

        // const config = await repo.config.getAll()
        // expect(config.Identity).to.exist()
        // await node.stop()
    })
}