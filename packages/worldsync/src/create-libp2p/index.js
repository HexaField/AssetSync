import { isNode } from '@AssetSync/common'
import mergeOptions from 'merge-options'

export default async function (options = {}) {
    if (isNode) {
        const { startRepo } = await import('../../../../libp2p-repo/src/index.js')
        const { default: Libp2p, defaultNodeConfig } = await import('./create-node.js')

        if (options.repoPath) {
            try {
                const { peerId, keychain, repo, print, isNew } = await startRepo({
                    repo: options.repoPath,
                    libp2pConfig: defaultNodeConfig(),
                    useMemory: globalThis.useMemory
                })


                const dhtDatastore = await repo.openDatastore('dht')

                const { datastore, keys } = repo
                const libp2pConfig = mergeOptions(defaultNodeConfig(), {
                    peerId,
                    datastore,
                    keychain,
                    config: {
                        dht: {
                            datastore: dhtDatastore
                        }
                    }
                })

                const libp2p = await Libp2p(libp2pConfig)
                libp2p.repo = repo
                return libp2p
            } catch (error) {
                console.log('Failed to start repo, using memory instead...', error)
            }
        }

        return await Libp2p()

    } else {

        await import('https://bundle.run/buffer@6.0.3')
        window.Buffer = window.buffer.Buffer
        // await import('./libp2p-repo/dist/index.min.js')
        const { default: Libp2p, defaultBrowserConfig } = await import('./create-browser.js')

        // dynamic imports here since webworkers can't access DOM scripts
        // await import('https://unpkg.com/libp2p@0.30.0/dist/index.min.js')
        

        await import('https://unpkg.com/libp2p-mplex@0.10.1/dist/index.min.js')
        // await import('https://unpkg.com/libp2p-secio@0.13.1/dist/index.min.js')
        await import('https://unpkg.com/libp2p-noise@2.0.1/dist/index.min.js')
        await import('https://unpkg.com/libp2p-websockets@0.15.0/dist/index.min.js')
        await import('https://unpkg.com/libp2p-gossipsub@0.7.0/dist/index.min.js')
        await import('https://unpkg.com/libp2p-kad-dht@0.20.4/dist/index.min.js')
        
        await import('https://unpkg.com/libp2p-webrtc-star@0.20.5/dist/index.min.js')

        if (options.repoPath) {
            try {
                const { peerId, keychain, repo, print, isNew } = await window.Libp2pRepo.startRepo({
                    repo: options.repoPath,
                    libp2pConfig: defaultBrowserConfig()
                })

                const dhtDatastore = await repo.openDatastore('dht')

                const { datastore, keys } = repo
                const libp2pConfig = mergeOptions(defaultBrowserConfig(), {
                    peerId,
                    datastore,
                    keychain,
                    config: {
                        dht: {
                            datastore: dhtDatastore
                        }
                    }
                })

                const libp2p = await Libp2p(libp2pConfig)
                libp2p.repo = repo
                return libp2p
            } catch (error) {
                console.log('Failed to start repo, using memory instead...', error)
            }
        }

        return await Libp2p()
        // return await Libp2p(config())
    }
}