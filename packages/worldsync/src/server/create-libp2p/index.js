import { isNode } from '@AssetSync/common'

export default async function (options = {}) {
    if (isNode) {
        const { startRepo } = await import('./libp2p-repo/src/index.js')
        const { default: Libp2p, config } = await import('./create-node.js')

        if (options.repoPath) {

            const { peerId, keychain, repo, print, isNew } = await startRepo({
                repo: options.repoPath,
                libp2pConfig: config()
            })

            const { datastore, keys } = repo
            const libp2pConfig = Object.assign({}, config(), {
                peerId,
                datastore,
                keychain
            })

            const libp2p = await Libp2p(libp2pConfig)
            libp2p.repo = repo
            return libp2p
        }

        return await Libp2p(options)

    } else {

        const startRepo = await import('./libp2p-repo/dist/index.min.js')
        const { default: Libp2p, config } = await import('./create-browser.js')

        if (options.repoPath) {
            const { peerId, keychain, repo, print, isNew } = await startRepo({
                repo: options.repoPath,
                libp2pConfig: config()
            })
            const { datastore, keys } = repo
            const libp2pConfig = Object.assign({}, config(), {
                peerId,
                datastore,
                keychain
            })

            const libp2p = await Libp2p(libp2pConfig)
            return libp2p
        }

        return await Libp2p(options)
    }
}