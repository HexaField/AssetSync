import { startRepo } from '../../../libp2p-repo/src/index.js'
import Libp2p, { config } from './create-libp2p.js'
import os from 'os'
import mergeOptions from 'merge-options'
import { randomString } from '@AssetSync/common/src/randomString.js'

export default async function (otherNode) {

    const { peerId, keychain, repo, print, isNew } = await startRepo({
        repo: process.cwd() + `/test/dbs/database-${randomString(8)}/`,
        libp2pConfig: await config()
    })

    const dhtDatastore = await repo.openDatastore('dht')

    const { datastore, keys } = repo
    const libp2pConfig = mergeOptions(await config(), {
        // peerId,
        datastore,
        keychain,
        config: {
            dht: {
                datastore: dhtDatastore
            }
        }
    })

    const libp2p = await Libp2p(otherNode, libp2pConfig)
    libp2p.repo = repo
    return libp2p
}