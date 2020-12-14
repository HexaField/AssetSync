import { isNode } from '@AssetSync/common'

export default async function (options = {}) {
    if (isNode) {
        const { startRepo } = await import('./libp2p-repo/src/index.js')
        const { default: Libp2p, config } = await import('./create-node.js')

        if (options.repoPath) {
            try {
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
            } catch (error) {
                console.log('Failed to start repo, using memory instead...', error)
            }
        }

        return await Libp2p(config())

    } else {

        const { default: Libp2p, config } = await import('./create-browser.js')
        // const { startRepo } = await import('./libp2p-repo/dist/index.min.js')
        // console.log(startRepo)
        // if (options.repoPath) {
        //     const { peerId, keychain, repo, print, isNew } = await startRepo({
        //         repo: options.repoPath,
        //         libp2pConfig: config()
        //     })
        //     const { datastore, keys } = repo
        //     const libp2pConfig = Object.assign({}, config(), {
        //         peerId,
        //         datastore,
        //         keychain
        //     })

        //     const libp2p = await Libp2p(libp2pConfig)
        //     return libp2p
        // }

        return await Libp2p()
        // return await Libp2p(config())
    }
}